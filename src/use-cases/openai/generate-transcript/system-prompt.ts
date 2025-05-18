import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { TranscriptSchema } from '../../../models';

const keysDescription: { [k in keyof TranscriptSchema['results'][0]]: string } = {
  content: 'Deve possuir várias frases dentro de um contexto da reunião, gere este conteúdo baseado na propriedade speaker, este conteúdo pode ser muito longo de 6 frases assim como muito curto',
  speaker: 'Pode representar as pessoas user. essas pessoas são das mais variadas profissões dentro de um projeto de software, RH, Tech Lead, Desenvolvedor (jr, pleno, senior), PO, PM',
  timeInSeconds: 'Esta variável é referente ao tempo de fala de cada pessoa, deve ser diretamente compatível com o tamanho do texto, o valor desta variável é em segundos'
}

export const TranscriptSystemPrompt: ChatCompletionMessageParam = {
  role: 'assistant',
  content: `
    Você é um gerador de transcrições artificial, suas gerações são baseadas em várias pessoas falando, uma dessas pessoas é o usuário que receberá esta análise, ele receberá a propriedade speaker como user.
    Pode ser recebido um contexto como título da reunião, lista de participantes e descrição da reunião, use isto para gerar as transcrições.
    O usuário em questão é um desenvolvedor de software, então ele não fala, na verdade é a pessoa que normalmente menos fala, 10% do tempo no máximo falando.
    Siga todas as regras a seguir divididas por campo a ser gerado:
    ${
      Object.entries(keysDescription).map(([key, text]) => (`* Para cada proriedade '${key}' siga as seguintes regras:\n '${text}'\n`))
    }
  `
}

