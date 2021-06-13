import React from "react";
import { StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import OnboardingOne from "assets/svg/OnboardingOne";
import OnboardingTwo from "assets/svg/OnboardingTwo";
import OnboardingThree from "assets/svg/OnboardingThree";
import OnboardingFour from "assets/svg/OnboardingFour";
import OnboardingFive from "assets/svg/OnboardingFive";

const OnboardingScreen = (props) => {
  return (
    <Onboarding
      onDone={() => props.navigation.navigate("Signup")}
      showSkip={false}
      showNext={false}
      transitionAnimationDuration={300}
      bottomBarHighlight={false}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      pages={[
        {
          backgroundColor: "rgba(240, 135, 177, 0.5)",
          image: <OnboardingOne />,
          title: "Welcome!",
          subtitle: "Browse through listings and like your favourite items",
        },
        {
          backgroundColor: "rgba(116, 163, 215, 0.5)",
          image: <OnboardingTwo />,
          title: "Like Away!",
          subtitle:
            "When two users like each other’s items in the same price range, a match occurs",
        },
        {
          backgroundColor: "rgba(87, 69, 94, 0.5)",
          image: <OnboardingThree />,
          title: "Chat!",
          subtitle:
            "Message other users to find out more about their items or discuss details of a swap",
        },
        {
          backgroundColor: "rgba(247, 208, 111, 0.5)",
          image: <OnboardingFour />,
          title: "Swap It!",
          subtitle: "To confirm a match, send or accept a match request",
        },
        {
          backgroundColor: "rgba(182, 200, 232, 0.5)",
          image: <OnboardingFive />,
          title: "You’re all set!",
          subtitle:
            "Visit the ‘About’ page in the application to find out more",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "latoBold",
    fontSize: 22,
    color: "white",
    marginHorizontal: 20,
  },
  subtitle: {
    fontFamily: "lato",
    fontSize: 16,
    color: "white",
    marginHorizontal: 20,
  },
});
