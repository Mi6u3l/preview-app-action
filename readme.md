# Preview app javascript action

This action prints updates the pull request description with link containing the pull request number

## Inputs

### `body-template`

The body to be appended to the pull request description

# Example usage

```yml
uses: Mi6u3l/preview-app-action@v6
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        body-template: '[Preview App](https://app.dev.linkfire.co/#/index.html:pull-%pr_number%)'
```
