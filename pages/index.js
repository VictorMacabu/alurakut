import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

function rand(min, max) { // randomiza a img da nova comunidade
  min = Math.ceil(min);   // min = 0
  max = Math.floor(max);  // max = 9999
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'VictorMacabu';
  const [comunidades, setComunidades] = React.useState([{
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];

    id: 454678465,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',//gerador de img http://picsum.photos/300/300?7234324
    urlDestino:''
    //objeto da comunidade inicial
  }]);

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(()=>{
    fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
    .then((respostaServidor) =>{      /*chamando a API do github*/
      return respostaServidor.json(); /*github retorna uma promise*/
    })                                /*espera a resposta dessa promise*/
    .then((respostaCompleta) => {     /*transforma a resposta num json*/
      setSeguidores(respostaCompleta);/*espera o resultado da nova promise do json */
    })
  },[])
   console.log(seguidores)
  const pessoasFavoritas = [
    'juunegreiros',
    'filipedeschamps',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'omariosouto'
  ]
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/*início da area do perfil do usuário */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>  
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        {/*fim da area do perfil do usuário */}
        
        {/*início da area do meio da pagina/ area do bem vindo */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>  
            <Box>{/* Primeira Box{bem vindo e icones de informação} */}
              <h1 className="title">
                Bem vindo(a), {usuarioAleatorio}
              </h1>

              <OrkutNostalgicIconSet />
            </Box>
          
            <Box>{/*segunda Box{Formulário} */}
              <h2 className="subTitle">O que você deseja fazer?</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: `http://picsum.photos/300/300?${rand(0,9999)}`,
                  urlDestino: dadosDoForm.get('urlDestino'),
                }
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              }}>
                <div>
                  <input
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="title"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
                  />
                </div>
                <div>
                  <input
                    placeholder="Coloque um URL de destino para a comunidade"
                    name="urlDestino"
                    aria-label="Coloque um URL de destino para a comunidade"
                  />
                </div>

                <button>
                  Criar comunidade
                </button>
              </form>
            </Box>
        </div>
        {/*fim da area do meio da pagina/ area do bem vindo */}

              {/*inicio do terceiro grid/ area seguidores e comunidades*/}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <div>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Seguidores ({seguidores.length})
              </h2>

              <ul>
                {seguidores.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`https://github.com/${itemAtual.login}`} >
                        <img src={`https://github.com/${itemAtual.login}.png`} />
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </div>{/*fim da area dos seguidores*/}

          <div>{/* area destinada a receber novas comunidades */}
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Minhas comunidades ({comunidades.length})
              </h2>

              <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.urlDestino} key={itemAtual.id}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </div>{/*fim da area das comunidades*/}

        </div>{/*fim do terceiro grid/ area seguidores e comunidades*/}
      </MainGrid>
    </>
  )
}
