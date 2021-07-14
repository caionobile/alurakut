import MainGrid from "@components/MainGrid";
import Box from "@components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "@libs/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "@components/ProfileRelations";
import { useEffect, useState } from "react";

const ProfileSidebar = ({ githubUser }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: 8 }}
      ></img>
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${githubUser}`}
          target="_blank"
        >
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default function Home() {
  const githubUser = "caionobile";
  const [comunidades, setComunidades] = useState([]);
  const [amigos, setAmigos] = useState([]);

  /*   useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => res.json())
      .then((data) => {
        setAmigos(
          ...amigos,
          data.map((user) => user.login)
        );
      });
  }, []); */

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get("title"),
      image: formData.get("image"),
    };
    if (comunidade.title) {
      if (!isURL(comunidade.image)) {
        comunidade.image = `https://picsum.photos/400/400?${Date.now()}`;
      }
      setComunidades([...comunidades, comunidade]);
    }
  };

  const isURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser}></ProfileSidebar>
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle">O que deseja fazer?</h2>
            <form onSubmit={handleCriaComunidade}>
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
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>

              <button>Criar comunidade</button>
              {/*               
              <button>Escrever depoimento</button>
              <button>Deixar um scrap</button> */}
            </form>
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos{" "}
              <span style={{ color: "#2E7BB4" }}>({amigos.length})</span>
            </h2>
            {/*             <ul>
              {amigos.map((amigo) => {
                return (
                  <li key={amigo}>
                    <a href={`https://github.com/${amigo}`} target="_blank">
                      <img src={`https://github.com/${amigo}.png`}></img>
                      <span>{amigo}</span>
                    </a>
                  </li>
                );
              })}
            </ul> */}
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades{" "}
              <span style={{ color: "#2E7BB4" }}>({comunidades.length})</span>
            </h2>
            {
              <ul>
                {comunidades.map((comunidade) => {
                  return (
                    <li key={comunidade.id}>
                      <a>
                        <img src={comunidade.image}></img>
                        <span>{comunidade.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            }
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
