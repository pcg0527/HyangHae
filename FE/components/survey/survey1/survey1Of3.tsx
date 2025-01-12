import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./survey1.module.css";
import clsx from "clsx";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../survey2/component/buttonTheme";
import SlideNav from "../slideNav/slideNav";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of3: React.FC<stateProps> = ({ setState }) => {
  const [number, setNumber] = useState(0);
  const nextStep = (num: number) => {
    if (num !== number) {
      return;
    }
    if (num === 1) {
      setState(num - 1);
      return;
    }
    if (num === 2 || num === 3) {
      setState(1);
      return;
    }
    setState(num);
  };
  const firstNum = 0;
  const lastNum = 4;
  const innerCardRef = useRef<HTMLDivElement[]>([]);
  const transformCard = () => {
    const nodeList = innerCardRef.current;

    nodeList.forEach((item, i) => {
      const degree = 360 / nodeList.length;

      if (i === 0) {
        item.style.transform = "rotateY(0deg) translateZ(10rem)";
        item.style.filter = "brightness(100%)";
      } else {
        item.style.transform = `rotateY(${degree * i}deg) translateZ(10rem) rotateY(-${
          degree * i
        }deg)`;
        item.style.filter = "brightness(60%)";
      }
      // if (nodeList.length >= 5) {
      //   if (i === 0) {
      //     item.style.transform = "rotateY(0deg) translateZ(10rem)";
      //     item.style.filter = "brightness(100%)";
      //   } else if (i === 1) {
      //     item.style.transform = "rotateY(72deg) translateZ(10rem) rotateY(-72deg)";
      //     item.style.filter = "brightness(60%)";
      //   } else if (i === 2) {
      //     item.style.transform =
      //       "rotateY(144deg) translateZ(10rem) rotateY(-144deg) translateX(10rem)";
      //     item.style.filter = "brightness(60%)";
      //   } else if (i === nodeList.length - 2) {
      //     item.style.transform =
      //       "rotateY(216deg) translateZ(10rem) rotateY(-216deg) translateX(-10rem)";
      //     item.style.filter = "brightness(60%)";
      //   } else if (i === nodeList.length - 1) {
      //     item.style.transform = "rotateY(288deg) translateZ(10rem) rotateY(-288deg)";
      //     item.style.filter = "brightness(60%)";
      //   } else {
      //     item.style.transform = `rotateY(${degree * i}deg) translateZ(10rem) rotateY(-${
      //       degree * i
      //     }deg)`;
      //     item.style.filter = "brightness(60%)";
      //   }
      // }
    });
  };

  useEffect(() => {
    transformCard();
  }, [number]);

  const prevCard = () => {
    if (number === firstNum) {
      setNumber(() => lastNum);
      return;
    }
    setNumber((prevState) => prevState - 1);
  };

  const nextCard = () => {
    if (number === lastNum) {
      setNumber(() => firstNum);
      return;
    }
    setNumber((prevState) => prevState + 1);
  };

  return (
    <>
      <header className={styles.header}>향기를 열고 싶은 계절</header>
      <div className={styles.container}>
        <div className="inner-cont">
          <div className={clsx(styles.cardsWrapper, "cardList")}>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 0,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 0 : number === 1 ? 4 : number === 2 ? 3 : number === 3 ? 2 : 1
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/spring.png"
                  alt="night"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    봄
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    봄에 어울리는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 1,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 1 : number === 1 ? 0 : number === 2 ? 4 : number === 3 ? 3 : 2
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 1)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/summer.png"
                  alt="survey3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    여름
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    여름에 어울리는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 2,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 2 : number === 1 ? 1 : number === 2 ? 0 : number === 3 ? 4 : 3
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 2)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/fall.png"
                  alt="survey3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    가을
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    가을에 어울리는 향을 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 2,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 3 : number === 1 ? 2 : number === 2 ? 1 : number === 3 ? 0 : 4
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 3)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/winter.png"
                  alt="survey3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    겨울
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    겨울에 어울리는 향을 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 2,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 4 : number === 1 ? 3 : number === 2 ? 2 : number === 3 ? 1 : 0
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 4)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/uni.jpg"
                  alt="survey3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    상관없음
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    어느 계절에나 어울리는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
        <div className={styles.slideNav}>
          <SlideNav limit={5} state={number} />
        </div>
      </div>

      <ThemeProvider theme={theme}>
        <div className={styles.btns}>
          <Button onClick={prevCard} size="large" variant="contained">
            이전
          </Button>
          <Button onClick={nextCard} size="large" variant="contained">
            다음
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Survey1Of3;
