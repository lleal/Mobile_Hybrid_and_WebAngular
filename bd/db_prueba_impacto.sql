--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY clientes (id, id_cliente, nombre, apellido, fecha_nac, email) FROM stdin;
9	ad134	admin 1	admin 1 apellido	2016-05-07	admin1@gmail.com
13	ad3	admin3	admin3 apellido	1988-05-20	admin3@gmail.com
15	ad5	admin5	admin5 apellido	2004-02-04	admin5@example.com
14	ad41	admin4	admin 4 apellido	2011-05-04	admin4@example.com
\.


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('clientes_id_seq', 15, true);


--
-- PostgreSQL database dump complete
--

