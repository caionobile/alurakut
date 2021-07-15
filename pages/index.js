import MainGrid from "@components/MainGrid";
import Box from "@components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "@libs/AlurakutCommons";
import ProfileRelations from "@components/Profile/ProfileRelations";
import ProfileSidebar from "@components/Profile/ProfileSidebar";
import { useEffect, useState } from "react";
import isURL from "../src/functions";

export default function Home() {
  const githubUser = "caionobile";
  const [comunidades, setComunidades] = useState([]);
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => res.json())
      .then((data) => {
        setAmigos(
          data.map((user) => ({
            id: user.login,
            name: user.login,
            image: `https://github.com/${user.login}.png`,
            link: `https://github.com/${user.login}`,
          }))
        );
      });
  }, []);

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comunidade = {
      id: new Date().toISOString(),
      name: formData.get("title"),
      image: formData.get("image"),
    };
    if (comunidade.name) {
      if (!isURL(comunidade.image)) {
        comunidade.image = `https://picsum.photos/400/400?${Date.now()}`;
      }
      setComunidades([...comunidades, comunidade]);
    }
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <aside className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser}></ProfileSidebar>
        </aside>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
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
          <ProfileRelations relationName="Meus amigos" items={amigos} />
          <ProfileRelations
            relationName="Minhas comunidades"
            items={comunidades}
          />
        </div>
      </MainGrid>
    </>
  );
}
