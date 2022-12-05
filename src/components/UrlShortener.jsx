import { React, useEffect, useState } from "react";
import axios from "./api";

export default function UrlShortener() {
  const [userInfo, setUserInfo] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const handleChange = (e) => {
    setLongUrl(e.target.value);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get("/test/userInfo");
        console.log("response: ", response.data);
        setUserInfo(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    getUserInfo();
  }, [shortUrl]);

  var config = {
    method: "post",
    url: "http://localhost:8080/api/v1/short-url",
    headers: {
      "Content-Type": "text/plain",
    },
    data: longUrl,
  };

  const getShortUrl = async (longUrl) => {
    axios(config)
      .then(function (response) {
        setShortUrl(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = () => {
    getShortUrl();
  };

  return (
    <div>
      <div>
        <input name="longUrl" value={longUrl} onChange={handleChange}></input>
        <button onClick={handleClick}>Get Short URL</button>
      </div>
      <div>
        <h2>Short URL: </h2>
        <p>{shortUrl}</p>
      </div>
    </div>
  );
}
