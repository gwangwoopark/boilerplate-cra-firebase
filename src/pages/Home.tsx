import { useAuthStore } from "../store/AuthStore";

function Home() {
  const { signout } = useAuthStore();

  const handleSignout = async () => signout();
  return (
    <>
      <main>
        <div>
          Home
          <button onClick={handleSignout}>Signout</button>
        </div>
      </main>
    </>
  );
}

export default Home;
