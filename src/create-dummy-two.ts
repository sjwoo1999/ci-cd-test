import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Team } from './team/entities/team.entity';
import { Player } from './team/entities/player.entity';
import { SupportMessage } from './support-message/entities/support-message.entity';
import { User } from './user/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '-',
  password: '-',
  database: '-',
  entities: [User, Team, SupportMessage, Player],
  synchronize: true,
  logging: false,
});

async function createDummyData() {
  await AppDataSource.initialize()
    .then(async () => {
      console.log(`==========[ Dummy Data Creater Started ]==========`);
      // 팀 생성
      for (let i = 0; i < 100; i++) {
        const team = new Team();
        team.name = faker.company.name();
        team.description = faker.company.catchPhrase();
        await AppDataSource.manager.save(team);

        // 해당 팀에 속하는 플레이어 생성
        for (let j = 0; j < 500; j++) {
          const player = new Player();
          player.name = faker.person.fullName(); // 실제와 같은 이름 생성
          player.nickname = faker.internet.userName(); // 인터넷 사용자 이름으로 닉네임 생성
          player.team = team;
          await AppDataSource.manager.save(player);
        }
        console.log(`${i}-th Dummy team & player data creation complete.`);
      }
    })
    .catch((error) => console.log(error));
}

createDummyData();
