import React from "react";
import {
  Html,
  Body,
  Preview,
  Container,
  Text,
  Button,
} from "@react-email/components";

function SendEmailLink(props) {
  const { setUrl, setText, setBtnText } = props;
  // const setUrl = "sbh.vercel.app";
  return (
    <Html lang="en">
      <Preview>SkillBeHired - Reset-Password</Preview>
      <Body>
        <Container>
          <Text>{setText}</Text>
        </Container>
        <Button href={setUrl}>{setBtnText}</Button>
        <Text>Or ignore it, if it isn't you... </Text>
      </Body>
    </Html>
  );
}
export default SendEmailLink;
