$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$codexHome = Join-Path $env:USERPROFILE ".codex"
$skillSource = Join-Path $PSScriptRoot "skills\ui-ux-pro-max"
$skillTargetRoot = Join-Path $codexHome "skills"
$skillTarget = Join-Path $skillTargetRoot "ui-ux-pro-max"
$configPath = Join-Path $codexHome "config.toml"

if (-not (Test-Path -LiteralPath $skillSource)) {
  throw "Staged skill not found: $skillSource"
}

New-Item -ItemType Directory -Force -Path $skillTargetRoot | Out-Null

if (Test-Path -LiteralPath $skillTarget) {
  Write-Host "Skill already exists: $skillTarget"
} else {
  Copy-Item -LiteralPath $skillSource -Destination $skillTarget -Recurse
  Write-Host "Installed skill: $skillTarget"
}

if (-not (Test-Path -LiteralPath $configPath)) {
  throw "Codex config not found: $configPath"
}

$apiKey = Read-Host "Paste your 21st.dev Magic API key"
if ([string]::IsNullOrWhiteSpace($apiKey)) {
  throw "API key is required for Magic MCP."
}

$config = Get-Content -LiteralPath $configPath -Raw
if ($config -match '(?m)^\[mcp_servers\.magic\]') {
  Write-Host "Magic MCP config already exists in $configPath"
} else {
  $snippet = @"

[mcp_servers.magic]
command = "npx"
args = ["-y", "@21st-dev/magic@latest"]

[mcp_servers.magic.env]
API_KEY = "$apiKey"
"@
  Add-Content -LiteralPath $configPath -Value $snippet
  Write-Host "Added Magic MCP config to $configPath"
}

Write-Host "Restart Codex to pick up the new skill and MCP server."
