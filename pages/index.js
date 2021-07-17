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
    /*     fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(async (res) => {
        const data = await res.json();
        setAmigos(
          data.map((user) => ({
            id: user.login,
            name: user.login,
            image: `https://github.com/${user.login}.png`,
            link: `https://github.com/${user.login}`,
          }))
        );
      })
      .catch((e) => {
        console.log(e);
      }); */

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization:
          process.env.NEXT_PUBLIC_DATO_READ_ONLY_API_TOKEN ||
          "b0d99af57e4db24ee1b07dee94f774",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          name
          image
          creatorSlug
          link
        }
      }`,
      }),
    })
      .then(async (resp) => {
        const comm = await resp.json();
        setComunidades(comm.data.allCommunities.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comunidade = {
      name: formData.get("title"),
      image: formData.get("image"),
      creatorSlug: githubUser,
      link: "",
    };
    if (comunidade.name) {
      if (!isURL(comunidade.image)) {
        comunidade.image = `https://picsum.photos/400/400?${Date.now()}`;
      }
      fetch("/api/comunidades", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        body: JSON.stringify(comunidade),
      })
        .then(async (resp) => {
          const dados = await resp.json();
          const comunidade = dados.registro;
          setComunidades([...comunidades, comunidade]);
        })
        .catch((e) => {
          console.log(e);
        });
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
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                  autoComplete="off"
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
