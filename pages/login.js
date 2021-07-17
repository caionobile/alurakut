import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState("");
  const [isValidGithubUser, setIsValidGithubUser] = useState(true);

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    if (githubUser) {
      fetch(`https://api.github.com/users/${githubUser}/followers`).then(
        async (res) => {
          const data = await res.json();
          if (data.message) {
            setIsValidGithubUser(false);
            return;
          }
          setIsValidGithubUser(true);
          router.push("/");
        }
      );
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleLoginRedirect}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              name="user"
              value={githubUser}
              onChange={(e) => {
                setGithubUser(e.target.value);
              }}
            />
            <button type="submit">Login</button>
            {isValidGithubUser ? null : (
              <p style={{ paddingTop: 10, color: "#d90000" }}>
                Digite um usuário do Github válido!
              </p>
            )}
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a
                href="https://github.com/signup?user_email=&source=form-home-signup"
                target="_blank"
              >
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
