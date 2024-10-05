import React, { useEffect, useState } from "react";
import "./newpass.css";
import { Header } from "../../components/common/header/header";
import { Wrapper } from "../../components/common/wrapper/wrapper";
import { InputPass } from "../../components/common/input/input";
import { InputItem } from "../../components/atoms/auth/inputItem/inputItem";
import { Button } from "../../components/common/button/button";
import { Spacer } from "../../components/common/spacer/spacer";
import auth from "../../api/auth";
import { Store } from "react-notifications-component";

export const NewPass = () => {
  const { passwordResetConfirm } = auth;

  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  const cleanAllFields = () => {
    setNewPass1("");
    setNewPass2("");
  };

  const changePassFunc = () => {
    const isFieldsEmpty = uid === "" || token === "" || newPass1 === "" ||
      newPass2 === "";

    if (isFieldsEmpty) {
      Store.addNotification({
        title: "Ошибка",
        message: "Необходимо заполнить все поля!",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    let changePassData = {
      new_password1: newPass1,
      new_password2: newPass2,
      uid: uid,
      token: token,
    };

    passwordResetConfirm(changePassData)
      .then((res) => {
        console.log(res, "RESPONSE TOKENS");
        Store.addNotification({
          title: "Пароль изменен",
          message: "Вы будете перенаправлены на страницу для входа в аккаунт",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });

        setTimeout(() => {
          window.location = "/auth";
        }, 5000);
      })
      .catch(async (error) => {
        console.log(error?.data?.detail, "TOKENS ERROR");
        cleanAllFields();
        Store.addNotification({
          title: "Ошибка",
          message: error?.data?.detail,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      changePassFunc();
    }
  };

  useEffect(() => {
    let currentUrl = window.location.pathname;
    let pathParts = currentUrl.split("/");
    let uid = pathParts[pathParts.length - 3];
    let token = pathParts[pathParts.length - 2];

    setUid(uid);
    setToken(token);
    console.log(uid, token);
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <form onSubmit={changePassFunc} className="auth">
          <img
            className="auth__img"
            src={require("../../assets/images/people.png")}
            alt="image-people"
          />
          <div className="auth__content">
            <div className="auth__content-labels">
              <div className="newpass__content-title">
                Придумайте новый пароль для аккаунта
                {/* &nbsp; */}
                {/* <span className='newpass__content-title--mail'>pochta@email.com</span> */}
              </div>
            </div>
            <Spacer height="35px" />
            <InputItem label="Новый пароль">
              <InputPass
                value={newPass1}
                onKeyDown={handleKeyDown}
                onChange={(e) => setNewPass1(e.target.value)}
                type="password"
                placeholder="**********************"
              />
            </InputItem>
            <Spacer height="25px" />
            <InputItem label="Повторите пароль">
              <InputPass
                value={newPass2}
                onKeyDown={handleKeyDown}
                onChange={(e) => setNewPass2(e.target.value)}
                type="password"
                placeholder="**********************"
              />
            </InputItem>
            <Spacer height="50px" />
            <Button
              type="submit"
              onClick={(e) => changePassFunc()}
              title="Сменить пароль"
            />
          </div>
        </form>
      </Wrapper>
    </>
  );
};

