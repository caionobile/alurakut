import { AlurakutProfileSidebarMenuDefault } from "@libs/AlurakutCommons";
import Box from "@components/Box";

const ProfileSidebar = ({ githubUser }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: 8 }}
      />
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

export default ProfileSidebar;
