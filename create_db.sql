-- Database: brainstorm

-- DROP DATABASE IF EXISTS brainstorm;

CREATE TABLE IF NOT EXISTS Articles (
	nb serial primary key,
	title text,
	bio text,
	img text,
	logo text
);

CREATE TABLE IF NOT EXISTS Events (
	sTime date,
	eTime date
) INHERITS (Articles);

CREATE TABLE IF NOT EXISTS CalendarEvents (
) INHERITS (Events);

CREATE TABLE IF NOT EXISTS MainEvents (
	layout text,
	theme text,
	slug text primary key
) INHERITS (CalendarEvents);

CREATE TABLE IF NOT EXISTS subEvents (
	parent int REFERENCES Events (nb) 
) INHERITS (CalendarEvents);

