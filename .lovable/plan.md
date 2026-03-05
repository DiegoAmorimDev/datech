

## Trabalhando com branches no Lovable

Infelizmente, o Lovable tem suporte **experimental e limitado** para branches do GitHub. Para habilitar essa funcionalidade:

1. Vá em **Account Settings > Labs**
2. Ative a opção **GitHub Branch Switching**

Depois de ativado, você poderá alternar entre branches dentro do Lovable.

Porém, o fluxo mais confiável para trabalhar com a branch `develop` seria:

1. **No GitHub/localmente**: crie a branch `develop` (que você já fez)
2. **No Lovable**: ative o recurso experimental de branch switching em Labs
3. **No Lovable**: alterne para a branch `develop` nas configurações do projeto (GitHub settings)
4. As alterações feitas no Lovable serão enviadas para a branch selecionada
5. Quando estiver tudo ok, faça o merge de `develop` para `main` diretamente no GitHub via Pull Request

Caso o recurso experimental não funcione bem, a alternativa é continuar editando na `main` pelo Lovable e usar o GitHub para gerenciar branches manualmente (cherry-pick ou merge).

