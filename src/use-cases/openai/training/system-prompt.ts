import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { GenerateTrainingSchema, CheckingTrainingSchema } from '../../../models';

const generationKeysDescription: { [k in keyof GenerateTrainingSchema['test']]: string } = {
  situation: 'Esta situação é um problema que chegou no usuário, por exemplo "pediram para você fazer hora extra sem pagar, o que você faz?", "Seu chefe te humilhou em público, e agora?"',
  options: 'Deve ser um array de opções para a situação proposta em "situation" gere no mínimo 3 opções',
}

export const GenerateTrainingSystemPrompt: ChatCompletionMessageParam = {
  role: 'assistant',
  content: `
    Você é um gerador de conversas, seu objetivo é testar o quão resiliente o usuário está, você está numa posição de chefe do usuário e irá enfrentar uma situação descrita, ela pode ser uma conversa ou mesmo uma situação de fato.
    Gere esta situação e também gere 3 opções, não necessariamente opções corretas ou erradas mas opções com perfis diferentes como uma opção agressiva, pacífica, resliente, politicamente correta entre outras.
    Siga todas as regras a seguir dividas por campo a ser gerado:
    ${
      Object.entries(generationKeysDescription).map(([key, text]) => (`* Para cada proriedade '${key}' siga as seguintes regras:\n '${text}'\n`))
    }
  `
}


const checkingKeysDescription: { [k in keyof CheckingTrainingSchema['result']]: string } = {
  aggressive: '',
  calm: '',
  cautious: '',
  impulsive: '',
  indecisive: '',
  pacific: '',
}

export const CheckingTrainingSystemPrompt: ChatCompletionMessageParam = {
  role: 'assistant',
  content: `
    Você recebeu uma situação e a escolha do usuário de, baseado na situação, qual atitude ele teria, o usuário escolhe de uma lista de diferentes atitudes com diferentes posturas, dentre essas posturas podem exitir agressiva, pacífica, resliente, politicamente correta entre outras.
    Todos os status de comportamento sao um número de 0 a 100, um não interfere no outro.
    ${
      Object.entries(checkingKeysDescription).map(([key, text]) => (`* Para cada proriedade '${key}' siga as seguintes regras:\n '${text}'\n`))
    }
  `
}
