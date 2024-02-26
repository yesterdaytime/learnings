#  You must confirm the network can be visit the github and other tools download link
#  If you can't visit the github, please add the 140.82.112.4    github.com to /ect/hosts
#  Other tools maybe have the different ip, please search them and add it.

# Install brew 
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install wget, some install need use it
brew install wget

brew install nvm 

# after this install
# https://github.com/zsh-users/zsh-autosuggestions
brew install zsh-autosuggest
# source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# https://github.com/gsamokovarov/jump
brew install jump
# add `eval "$(jump shell)"` in to .bash_profile or .zshrc

