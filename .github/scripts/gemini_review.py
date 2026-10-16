#!/usr/bin/env python3
"""
Native Gemini Code Reviewer for GSlider Blocks.
100% Native implementation with zero 3rd-party GitHub Action dependencies.
Powered by Google Gemini 3.8 Flash with High Reasoning.
"""

import os
import sys
import subprocess
from google import genai
from google.genai import types

def run_cmd(cmd):
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=True)
    return result.stdout.strip()

def get_pr_diff():
    # Diff against the target branch (main), excluding compiled bundles, locks, and vendor
    exclude_globs = (
        "':!build' ':!vendor' ':!node_modules' ':!assets' "
        "':!package-lock.json' ':!composer.lock' ':!*.zip' ':!*.md' ':!*.txt'"
    )
    diff = run_cmd(f"git diff origin/main...HEAD -- . {exclude_globs}")
    return diff

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    pr_number = os.environ.get("PR_NUMBER")
    
    if not api_key:
        print("::error::GEMINI_API_KEY environment variable is missing.")
        sys.exit(1)

    if not pr_number:
        print("::warning::PR_NUMBER is missing. Skipping review.")
        sys.exit(0)

    print(f"Fetching code diff for PR #{pr_number}...")
    diff = get_pr_diff()
    
    if not diff:
        print("No relevant code changes found to review.")
        sys.exit(0)

    # Truncate if diff is exceptionally large to fit within context safety bounds
    max_chars = 150000
    if len(diff) > max_chars:
        diff = diff[:max_chars] + "\n\n...[Diff truncated due to size]..."

    print("Sending diff to Gemini 3.8 Flash High Reasoning...")
    client = genai.Client(api_key=api_key)

    prompt = f"""You are a Principal WordPress Core & React/Gutenberg Senior Code Reviewer.
Carefully analyze the following Pull Request git diff for the WordPress plugin 'gslider-blocks'.

### Key Review Focus Areas:
1. **WordPress Security & Standards**:
   - Proper input sanitization (`sanitize_text_field`, `sanitize_key`, `wp_strip_all_tags`).
   - Output escaping (`esc_html__`, `esc_attr__`, `esc_url`, `wp_kses_post`).
   - Strict adherence to WordPress.org guidelines: NO arbitrary user-defined custom CSS inputs or script injection.
   - PHP 7.4+ compatibility (avoid PHP 8-only features without backward compatibility).
2. **React & Gutenberg Block Lifecycle**:
   - Attribute schema consistency in `attributes.js`.
   - `useEffect` hooks: ensure Swiper.js instances are cleaned up with `swiper.destroy(true, true)` on unmount/re-init.
   - Responsive attribute handling (Desktop, Tablet, Mobile).
   - No direct DOM mutations outside Swiper refs.
3. **Performance & Clean Code**:
   - Redundant re-renders, memory leaks, and unbounded REST queries.

Provide structured, actionable feedback with exact file names, line references, and code suggestions where appropriate.
If the code is clean and follows all standards, give a brief positive summary approving the changes.

---
### Pull Request Diff:
```diff
{diff}
```
"""

    model_name = "gemini-3.8-flash"
    
    try:
        # Attempt calling with High Reasoning
        config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level=types.ThinkingLevel.HIGH),
            temperature=0.1
        )
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=config
        )
    except Exception as e:
        print(f"Notice: Falling back to standard reasoning budget due to: {e}")
        try:
            # Fallback configuration if thinking_level enum varies
            config = types.GenerateContentConfig(
                thinking_config=types.ThinkingConfig(thinking_budget=-1),
                temperature=0.1
            )
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=config
            )
        except Exception as e2:
            print(f"Fallback to default model config due to: {e2}")
            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )

    review_text = response.text
    if not review_text:
        print("::warning::Gemini returned an empty review.")
        sys.exit(0)

    header = "## 🤖 ⚡ Gemini 3.8 Flash High Code Review\n\n"
    footer = "\n\n---\n*Automated review powered natively by Google Gemini 3.8 Flash.*"
    full_comment = header + review_text + footer

    comment_file = "/tmp/gemini_review_comment.md"
    with open(comment_file, "w", encoding="utf-8") as f:
        f.write(full_comment)

    print("Posting review comment to Pull Request...")
    post_cmd = f"gh pr comment {pr_number} --body-file {comment_file}"
    result = run_cmd(post_cmd)
    print("Review posted successfully!")

if __name__ == "__main__":
    main()
