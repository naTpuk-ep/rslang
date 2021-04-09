import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuth = () => {
  const [token, setToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userImage, setUserImage] = useState<string[]>([""]);

  const login = useCallback(
    (
      jwtToken: string,
      jwtRefreshToken: string,
      id: string,
      userName: string,
      userEmail: string,
      image: string[]
    ) => {
      setToken(jwtToken);
      setRefreshToken(jwtRefreshToken);
      setUserId(id);
      setName(userName);
      setEmail(userEmail);
      setUserImage(image);
      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: jwtToken,
          name: userName,
          email: userEmail,
          userImage: image,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setRefreshToken("");
    setUserId("");
    setName("");
    setUserImage([""]);
    setEmail("");
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}");
    if (data && data.token) {
      login(
        data.token,
        data.refreshToken,
        data.userId,
        data.name,
        data.email,
        data.userImage
      );
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    token,
    refreshToken,
    userId,
    name,
    email,
    userImage,
    ready,
  };
};

export default useAuth;