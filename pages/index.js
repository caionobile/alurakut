import MainGrid from "@components/MainGrid";
import Box from "@components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "@libs/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "@components/ProfileRelations";

const ProfileSidebar = ({ user }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${user}.png`}
        style={{ borderRadius: 8 }}
      ></img>
    </Box>
  );
};

export default function Home() {
  const githubUser = "caionobile";
  const people = ["aline", "breno", "arthur"];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar user={githubUser}></ProfileSidebar>
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade</h2>

            <ul>
              {people.map((i) => {
                return (
                  <li>
                    <a
                      href={`https://api.github.com/users/${githubUser}/followers`}
                      key={i}
                    >
                      <img src={`https://github.com/${githubUser}.png`}></img>
                      <span>{i}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
}
