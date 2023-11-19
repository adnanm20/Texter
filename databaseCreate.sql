CREATE TABLE users (
	id SERIAL,
	username varchar(20) NOT NULL,
	email varchar(255),
	salt varchar(255),
	password_hash varchar(255),
	google_signin bool default 0,
	verified bool NOT NULL default 0
);
-- google_signin -> check if sign in is only available via google, no password
-- verified -> by default not, has to verify email to be able to start a new conversation, others can start convo with them
CREATE TABLE channels (
	id SERIAL,
	channel_name varchar(255),
	channel_type int NOT NULL default 0,
	last_message_id bigint unsigned
);
-- channel_type -> 0 normal 2 people chat / 1 group / 2 public chat maybe  (not sure if necessary)

CREATE TABLE users_channels (
	id SERIAL,
	user_id bigint unsigned NOT NULL,
	channel_id bigint unsigned NOT NULL,
	join_timestamp timestamp NOT NULL,
	wantedness int NOT NULL default 0,
	permissions int unsigned NOT NULL
);
-- wantedness -> 0 request / 1 general / 2 primary
-- permissions -> example 000...0001{32bits} means can read messages

CREATE TABLE sessions (
	user_id bigint unsigned NOT NULL,
	cookie varchar(255) NOT NULL,
	expire_timestamp timestamp NOT NULL
);

CREATE TABLE messages (
	id SERIAL,
	sender_id bigint unsigned NOT NULL,
	channel_id bigint unsigned NOT NULL,
	message_type int unsigned NOT NULL default 0,
	content longtext NOT NULL,
	message_timestamp timestamp NOT NULL default current_timestamp()
);
-- message_type 0 text / 1 media / 2 voice ...