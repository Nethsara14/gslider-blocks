# Model Context Protocol (MCP) Server & AI Assistant Workflows

This guide explains how to set up, build, and connect the **GSlider Model Context Protocol (MCP) Server** with modern AI coding assistants, including **Cursor**, **Claude Desktop**, **Antigravity**, and **VS Code (Cline / Roo Code)**.

---

## ⚡ Overview & Architecture

GSlider Blocks includes a native, standalone Model Context Protocol server located at [`packages/mcp-server/`](../../packages/mcp-server/). It implements the open [Model Context Protocol specification](https://modelcontextprotocol.io/) over standard input/output (`stdio`) transport.

```text
┌────────────────────────────────────────────────────────┐
│               Developer Workstation                    │
│                                                        │
│   ┌───────────────────┐        stdio JSON-RPC          │
│   │   AI Assistant    │ ◄──────────────────────────┐   │
│   │ (Cursor / Claude) │ ─────────────────────────┐ │   │
│   └───────────────────┘                          │ │   │
│                                                  ▼ │   │
│                          ┌───────────────────────────┐ │
│                          │    GSlider MCP Server     │ │
│                          │ (packages/mcp-server/dist)│ │
│                          └─────────────┬─────────────┘ │
│                                        │               │
│                        reads schemas & │ generates CSS │
│                                        ▼               │
│                          ┌───────────────────────────┐ │
│                          │   GSlider Block Modules   │ │
│                          │  (src/blocks/*/styling)   │ │
│                          └───────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Key Architectural Characteristics
- **$0 Cloud Cost**: Communicates entirely over local `stdio` processes. No external API servers, hosted proxies, or subscriptions required.
- **Privacy & Security**: All block schemas, templates, and generated code remain strictly on your local computer.
- **Admin Dashboard Decoupling**: The MCP server is strictly a local developer tool. It has **zero runtime presence** in the merchant-facing WordPress Admin Dashboard (which remains focused on its 4 core tabs: *Overview*, *Blocks*, *Settings*, and *Tools*).
- **Zero Production Bloat**: `packages/` is strictly excluded from distributable WordPress plugin archives (`webpack.zip.js`).

---

## 🚀 Local Developer Setup & Build Process

### Step 1: Clone Repository and Install Dependencies

From your terminal, clone the repository and install root dependencies:

```bash
git clone https://github.com/noruzzamans/gslider-blocks.git
cd gslider-blocks
npm install
```

Then install the MCP server's workspace dependencies:

```bash
cd packages/mcp-server
npm install
cd ../..
```

---

### Step 2: Build the MCP Server Locally

From the root project directory, run the dedicated build script:

```bash
npm run mcp:build
```

*(Alternatively, you can run `npm run build` inside `packages/mcp-server`)*.

This command executes the build pipeline:
1. Compiles server-side save methods (`scripts/bundle-core-saves.js`).
2. Bundles block schemas and attribute definitions (`scripts/bundle-blocks.js`).
3. Extracts JSON schemas (`scripts/extract-schemas.js`).
4. Compiles TypeScript into [`packages/mcp-server/dist/index.js`](../../packages/mcp-server/dist/index.js).

---

### Step 3: Verify Zero Schema Drift

To verify that the MCP server's schemas are synchronized with the latest block attributes in `src/blocks/`, run the drift test:

```bash
npm run mcp:test
```

---

## 💻 AI Assistant Client Configuration

Configure your AI assistant to execute `packages/mcp-server/dist/index.js` using Node.js. 

> [!IMPORTANT]
> Replace `/absolute/path/to/gslider-blocks` with the actual absolute path to your cloned repository on your workstation.

### 1. Cursor (`.cursor/mcp.json`)

Create or update `.cursor/mcp.json` in your project or global user settings:

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

### 2. Claude Desktop (`claude_desktop_config.json`)

Locate your Claude Desktop configuration file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the `gslider` server definition:

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

### 3. Antigravity IDE (`.antigravity/mcp.json`)

Configure in your workspace `.antigravity/mcp.json`:

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

### 4. VS Code (Cline / Roo Code) (`cline_mcp_settings.json`)

In your Cline MCP settings:

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

## 🛠️ Registered Tools Reference

The server exposes 5 specialized tools adhering to the `gslider_<verb>_<noun>` namespace:

### 1. `gslider_ping`
Health check tool verifying server connectivity and version.
- **Parameters**: None.
- **Returns**: JSON object with server status, name, and version (`1.0.0`).

---

### 2. `gslider_list_blocks`
Lists all available GSlider blocks and their high-level capabilities.
- **Parameters**: None.
- **Supported Blocks**:
  - `gslider-blocks/base`: Base hero slider with titles, subtitles, and CTA buttons.
  - `gslider-blocks/testimonial`: Client review cards with star ratings and avatars.
  - `gslider-blocks/image-slider`: Image carousels with lightbox and captions.
  - `gslider-blocks/logo-carousel`: Partner brand showcases with grayscale-to-color hover effects.
  - `gslider-blocks/flexi-content`: Dynamic container nesting arbitrary Gutenberg inner blocks.

---

### 3. `gslider_get_block_schema`
Fetches complete JSON attribute schema, responsive object keys, defaults, and slide structures for a specific block.
- **Parameters**:
  - `blockSlug` (*string*, required): Block slug (`base`, `testimonial`, `image-slider`, `logo-carousel`, `flexi-content`, or `flexi-content-item`).
- **Returns**: Complete JSON schema including all 8-key spacing definitions, 13-key typography rules, and Swiper layout options.

---

### 4. `gslider_generate_block`
Generates paste-ready Gutenberg block markup with valid delimiter comments (`<!-- wp:gslider-blocks/... -->`), auto-generated unique `blockId`, sanitized scoped CSS (`blockStyle`), and normalized attributes.
- **Parameters**:
  - `blockSlug` (*string*, required): Target block slug.
  - `slides` (*array*, required): Array of slide content items.
  - `layout` (*object*, optional): High-level layout configuration (`columns`, `gap`, `speed`, `autoplay`, `effect`, `navigation`, `pagination`).
  - `attributes` (*object*, optional): Raw block attributes overrides.
- **Returns**:
  ```json
  {
    "markup": "<!-- wp:gslider-blocks/image-slider {...} -->\n<div class=\"wp-block-gslider-blocks-image-slider ...\">...</div>\n<!-- /wp:gslider-blocks/image-slider -->",
    "blockId": "gslider-image-slider-a1b2c3d4",
    "attributes": { ... }
  }
  ```

---

### 5. `gslider_validate_block`
Validates block markup or raw attribute dictionaries against schema constraints, catching unknown keys, illegal effect types, or missing blockId.
- **Parameters**:
  - `markup` (*string*, optional): Serialized Gutenberg block HTML string.
  - `blockSlug` (*string*, optional): Block slug when validating raw attributes.
  - `attributes` (*object*, optional): Attribute dictionary to validate.
- **Returns**: Validation status, error lists, and structural warnings.

---

## 📚 Template Resources Reference

AI assistants can directly read curated slider design templates via MCP URI resources:

| Resource URI | Target Block | Description |
| :--- | :--- | :--- |
| `gslider://templates/hero-slider` | `image-slider` | Full-width high-impact hero slider with smooth slide transitions. |
| `gslider://templates/product-carousel` | `image-slider` | Responsive 3-column e-commerce card carousel. |
| `gslider://templates/testimonial-cards` | `testimonial` | 2-column client review cards with 5-star ratings. |
| `gslider://templates/brand-logos` | `logo-carousel` | Partner logo carousel with hover effects. |
| `gslider://templates/content-hero` | `base` | Content slider with titles, buttons, fade transition, and autoplay. |

---

## 💡 Example AI Assistant Prompts

Once configured, you can prompt your AI assistant directly in Cursor or Claude:

```text
"Using the gslider MCP server, generate a 3-column logo carousel for partner brands with autoplay enabled and infinite loop."
```

```text
"Inspect the schema for gslider-blocks/testimonial and show me how typography attributes are structured."
```

```text
"Load the template gslider://templates/hero-slider and customize it with 4 slides linking to our /services page."
```
