# Publishing Guide for RenzmcLang VSCode Extension

This guide will help you publish the RenzmcLang Language Support extension to the Visual Studio Code Marketplace.

## Prerequisites

1. **Microsoft Account**: You need a Microsoft account to access Azure DevOps
2. **Azure DevOps Organization**: Create an organization at https://dev.azure.com
3. **Personal Access Token (PAT)**: Required for publishing
4. **vsce Tool**: Already installed (`npm install -g @vscode/vsce`)

## Step 1: Create Azure DevOps Organization

1. Go to https://dev.azure.com
2. Sign in with your Microsoft account
3. Click "Create new organization"
4. Choose a name for your organization (e.g., "renzmc-extensions")

## Step 2: Create Personal Access Token (PAT)

1. From your organization's home page (e.g., `https://dev.azure.com/renzmc-extensions`)
2. Click on your profile icon (top right) → **User settings** → **Personal access tokens**
3. Click **New Token**
4. Configure the token:
   - **Name**: "VSCode Extension Publishing"
   - **Organization**: **All accessible organizations**
   - **Expiration**: Choose your preferred duration (e.g., 90 days, 1 year)
   - **Scopes**: **Custom defined**
     - Click **Show all scopes**
     - Scroll to **Marketplace** section
     - Check **Manage** scope
5. Click **Create**
6. **IMPORTANT**: Copy the token immediately and save it securely (you won't be able to see it again)

## Step 3: Create Publisher

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with the same Microsoft account
3. Click **Create publisher**
4. Fill in the details:
   - **ID**: `RenzMc` (must match the `publisher` field in package.json)
   - **Name**: `RenzMc` (display name)
   - **Email**: Your email address
5. Click **Create**

## Step 4: Login with vsce

Open terminal in the extension directory and run:

```bash
cd vscode-extension
vsce login RenzMc
```

When prompted, paste your Personal Access Token.

## Step 5: Publish the Extension

### Option A: Publish Directly

```bash
vsce publish
```

This will:
1. Package the extension
2. Upload it to the Marketplace
3. Make it available for users to install

### Option B: Package First, Then Publish

```bash
# Package the extension
vsce package

# This creates: renzmc-language-support-1.0.0.vsix

# Then publish the package
vsce publish --packagePath renzmc-language-support-1.0.0.vsix
```

## Step 6: Verify Publication

1. Go to https://marketplace.visualstudio.com/manage
2. You should see your extension listed
3. Click on the extension to view its marketplace page
4. Verify that all information is correct:
   - Icon displays correctly
   - README content is formatted properly
   - Screenshots/examples are visible
   - Categories are correct

## Step 7: Test Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "RenzmcLang"
4. Click Install
5. Test with a .rmc file to verify syntax highlighting works

## Updating the Extension

When you need to publish an update:

1. Update the version in `package.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Update `CHANGELOG.md` with the changes

3. Publish the update:
   ```bash
   # Auto-increment version and publish
   vsce publish patch  # for 1.0.0 -> 1.0.1
   vsce publish minor  # for 1.0.0 -> 1.1.0
   vsce publish major  # for 1.0.0 -> 2.0.0
   
   # Or specify exact version
   vsce publish 1.0.1
   ```

## Unpublishing (if needed)

If you need to unpublish the extension:

```bash
vsce unpublish RenzMc.renzmc-language-support
```

Or via the web interface:
1. Go to https://marketplace.visualstudio.com/manage
2. Find your extension
3. Click **More Actions** → **Unpublish**

## Troubleshooting

### Error: "You exceeded the number of allowed tags of 30"
- Reduce the number of keywords in `package.json` to maximum 30

### Error: "403 Forbidden" or "401 Unauthorized"
- Verify your PAT has the correct scope (Marketplace - Manage)
- Ensure you selected "All accessible organizations" when creating the PAT
- Try logging in again: `vsce login RenzMc`

### Error: "The extension 'name' already exists"
- The extension name must be unique in the Marketplace
- Change the `name` field in `package.json` to something unique

### Extension not showing up in search
- Wait a few minutes for the Marketplace to index your extension
- Check that your extension is published (not just packaged)
- Verify the categories and keywords are appropriate

## Best Practices

1. **Version Control**: Always commit your changes before publishing
2. **Testing**: Test the packaged extension locally before publishing
3. **Changelog**: Keep CHANGELOG.md updated with each release
4. **README**: Ensure README.md has clear examples and screenshots
5. **Icon**: Use a high-quality icon (at least 128x128px)
6. **Keywords**: Use relevant keywords for better discoverability
7. **Categories**: Choose appropriate categories

## Resources

- [VSCode Extension API](https://code.visualstudio.com/api)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)

## Support

For issues or questions:
- GitHub: https://github.com/RenzMc/renzmc-extension
- Email: renzaja11@gmail.com

---

**Ready to publish!** The extension is fully configured and ready for the VSCode Marketplace.