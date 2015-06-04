drop table if exists title;
drop table if exists college_secretary;
drop table if exists college ;
drop table if exists user ;
-- 学院(id,名称)
create table college(id varchar(10) not null,name varchar(50) not null,primary key(id)) character set=utf8;
alter table college add unique (name);
-- 用户(id,姓名,性别,密码,角色,电话,邮箱)，角色包括s(学生)，c(教学秘书),t(教师)，u(学校管理员)，m(督导)
create table user(id varchar(20) not null,name varchar(100) not null,sex varchar(10) not null,password varchar(20) not null,role char(1) not null,tel varchar(20),email varchar(50),primary key(id)) character set=utf8;
-- 教学秘书(id,用户.id,学院.id)
create table college_secretary(id bigint not null auto_increment,user_id varchar(20) not null,college_id varchar(10) not null,primary key(id));
-- college_secretary.user_id外键关联到user.id，删除college_secretary时同时删除user
alter table college_secretary add foreign key (user_id) references user(id) on delete cascade;
-- college_secretary.college_id外键关联到college.id
alter table college_secretary add foreign key (college_id) references college(id);
-- 职称(id,名称,职称类型)，职称类型包括初级、中级、副高、正高
create table title(id bigint not null,name varchar(20) not null,type varchar(10) not null ,primary key(id)) character set=utf8;
-- 插入学院数据
insert into college values('01','公共管理学院');
insert into college values('02','经济与工商管理学院');
insert into college values('03','建设管理与房地产学院');
insert into college values('04','外国语学院');
insert into college values('05','艺术学院');
insert into college values('06','美视电影学院');
insert into college values('07','新闻学院');
insert into college values('08','法学院');
insert into college values('09','软件学院');
insert into college values('10','数理学院');
insert into college values('11','机械工程学院');
insert into college values('12','光电工程学院');
insert into college values('13','材料科学与工程学院');
insert into college values('14','动力工程学院');
insert into college values('15','电气工程学院');
insert into college values('16','通信工程学院');
insert into college values('17','自动化学院');
insert into college values('18','计算机学院');
insert into college values('19','建筑城规学院');
insert into college values('20','土木工程学院');
insert into college values('21','城市建设与环境工程学院');
insert into college values('22','化学化工学院');
insert into college values('23','生物工程学院');
insert into college values('24','资源及环境科学学院');
insert into college values('25','体育学院');
insert into college values('26','城市学院');
insert into college values('27','网络教育学院');
insert into college values('29','城市科技学院');
insert into college values('30','数学与统计学院');
insert into college values('31','物理学院');
insert into college values('32','生命科学学院');
-- 插入职称信息
insert into title values(1,'教授','正高');
insert into title values(2,'研究员','正高');
insert into title values(3,'副教授','副高');
insert into title values(4,'副研究员','副高');
insert into title values(5,'高级工程师','副高');
insert into title values(6,'讲师','中级');
insert into title values(7,'助理研究员','中级');
insert into title values(8,'工程师','中级');
insert into title values(9,'助教','初级');
insert into title values(10,'研究实习员','初级');
insert into title values(11,'助理工程师','初级');
-- 插入用户信息（测试）
insert into user values('s1','学生1','男','0','s','','');
insert into user values('s2','学生2','女','0','s','','');
insert into user values('s3','学生3','男','0','s','','');
insert into user values('t1','教师1','女','0','t','','');
insert into user values('t2','教师2','男','0','t','','');
insert into user values('t3','教师3','男','0','t','','');
insert into user values('c1','秘书1','女','0','c','','');
insert into user values('c2','秘书2','男','0','c','','');
insert into user values('c3','秘书3','女','0','c','','');
insert into user values('u1','学校1','女','0','u','','');
insert into user values('u2','学校2','男','0','u','','');
insert into user values('m1','督导','男','0','m','','');