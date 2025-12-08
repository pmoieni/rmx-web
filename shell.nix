{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    corepack
    prettierd
    nodePackages.eslint_d
    nodePackages.svelte-language-server
    nodePackages.typescript-language-server
    nodePackages.bash-language-server
    vscode-langservers-extracted
    tailwindcss-language-server
    nil
  ];
}
