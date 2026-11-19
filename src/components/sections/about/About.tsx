import profileImg from '@/assets/images/profile.jpg';
import { Section, Wrapper } from '@/components/layout';

import styles from './About.module.scss';

export default function About() {
  return (
    <Section sectionId="about">
      <Wrapper>
        <div className={styles.profile}>
          <div className={styles.introduceText}>
            <div className={styles.titleBox}>
              <h2 className={styles.aboutTitle}>
                Hello I&apos;m FrontEnd Developer
              </h2>
              <p className={styles.aboutMe}>안녕하세요. 김정현입니다.</p>
            </div>
            <div className={styles.aboutText}>
              <p>
                팀 프로젝트에서 팀장을 맡아 유저의 입장에서 문제를 고민하고 유저
                플로우 차트를 작성하며 사용자 친화적인 방향으로 개발을
                이끌었습니다.
              </p>
              <p>
                또한, 웹 퍼블리셔 경험을 바탕으로 팀원들의 코드 개선에도
                참여했습니다. 진행 상황과 문제를 공유하고, 코드 리뷰와
                리팩터링을 통해 협업의 중요성을 배우며 프로젝트의 완성도를
                높였습니다.
              </p>
              <p>
                이러한 경험을 바탕으로 주도적으로 문제를 해결하고, 더 나은
                결과를 만들어내는 개발자로 성장하고 싶습니다.
              </p>
            </div>
          </div>
          <img
            className={styles.profileImg}
            src={profileImg}
            alt="프로필 이미지"
            loading="eager"
          />
        </div>
      </Wrapper>
    </Section>
  );
}
