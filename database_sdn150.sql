--
-- PostgreSQL database dump
--

\restrict e3ZDt1XdH8dzbW1FeBt5HZlYpojccCJ0juTxMgK2QQlK44S9AsggiUrt0xut5yA

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-09 00:02:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16410)
-- Name: buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buku (
    id character varying(50) NOT NULL,
    judul character varying(255) NOT NULL,
    penulis character varying(255) NOT NULL,
    stok integer DEFAULT 0 NOT NULL,
    kategori_id integer,
    CONSTRAINT buku_stok_check CHECK ((stok >= 0))
);


ALTER TABLE public.buku OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16402)
-- Name: kategori; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategori (
    id integer NOT NULL,
    nama_kategori character varying(100) NOT NULL,
    sub_kategori character varying(255)
);


ALTER TABLE public.kategori OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16401)
-- Name: kategori_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kategori_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kategori_id_seq OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 221
-- Name: kategori_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kategori_id_seq OWNED BY public.kategori.id;


--
-- TOC entry 226 (class 1259 OID 16439)
-- Name: peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peminjaman (
    id integer NOT NULL,
    siswa_id character varying(50),
    buku_id character varying(50),
    tanggal_pinjam date DEFAULT CURRENT_DATE NOT NULL,
    tanggal_kembali date,
    status character varying(20) DEFAULT 'Dipinjam'::character varying,
    CONSTRAINT peminjaman_status_check CHECK (((status)::text = ANY ((ARRAY['Dipinjam'::character varying, 'Kembali'::character varying])::text[])))
);


ALTER TABLE public.peminjaman OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16438)
-- Name: peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peminjaman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.peminjaman_id_seq OWNER TO postgres;

--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 225
-- Name: peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peminjaman_id_seq OWNED BY public.peminjaman.id;


--
-- TOC entry 220 (class 1259 OID 16389)
-- Name: petugas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.petugas (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    nama character varying(100) NOT NULL
);


ALTER TABLE public.petugas OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16388)
-- Name: petugas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.petugas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.petugas_id_seq OWNER TO postgres;

--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 219
-- Name: petugas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.petugas_id_seq OWNED BY public.petugas.id;


--
-- TOC entry 224 (class 1259 OID 16428)
-- Name: siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.siswa (
    id character varying(50) NOT NULL,
    nama character varying(100) NOT NULL,
    kelas character varying(50) NOT NULL,
    alamat text
);


ALTER TABLE public.siswa OWNER TO postgres;

--
-- TOC entry 4774 (class 2604 OID 16405)
-- Name: kategori id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori ALTER COLUMN id SET DEFAULT nextval('public.kategori_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 16442)
-- Name: peminjaman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman ALTER COLUMN id SET DEFAULT nextval('public.peminjaman_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 16392)
-- Name: petugas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petugas ALTER COLUMN id SET DEFAULT nextval('public.petugas_id_seq'::regclass);


--
-- TOC entry 4947 (class 0 OID 16410)
-- Dependencies: 223
-- Data for Name: buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buku (id, judul, penulis, stok, kategori_id) FROM stdin;
\.


--
-- TOC entry 4946 (class 0 OID 16402)
-- Dependencies: 222
-- Data for Name: kategori; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kategori (id, nama_kategori, sub_kategori) FROM stdin;
1	Fiksi	Novel, Cerpen, Dongeng
2	Pelajaran	Matematika, IPA, IPS, Bahasa Indonesia
3	Referensi	Kamus, Ensiklopedia, Atlas
\.


--
-- TOC entry 4950 (class 0 OID 16439)
-- Dependencies: 226
-- Data for Name: peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peminjaman (id, siswa_id, buku_id, tanggal_pinjam, tanggal_kembali, status) FROM stdin;
\.


--
-- TOC entry 4944 (class 0 OID 16389)
-- Dependencies: 220
-- Data for Name: petugas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.petugas (id, username, password, nama) FROM stdin;
1	admin	$2a$10$X8Ld/b8qJ4hHk0Y5Ym5D1Oe0K/a1y.hS8J9tE2HqD7t4g4c3v5n6e	Administrator Perpustakaan
\.


--
-- TOC entry 4948 (class 0 OID 16428)
-- Dependencies: 224
-- Data for Name: siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.siswa (id, nama, kelas, alamat) FROM stdin;
\.


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 221
-- Name: kategori_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kategori_id_seq', 3, true);


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 225
-- Name: peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peminjaman_id_seq', 1, false);


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 219
-- Name: petugas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.petugas_id_seq', 1, true);


--
-- TOC entry 4788 (class 2606 OID 16422)
-- Name: buku buku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 16409)
-- Name: kategori kategori_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori
    ADD CONSTRAINT kategori_pkey PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 16449)
-- Name: peminjaman peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 16398)
-- Name: petugas petugas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petugas
    ADD CONSTRAINT petugas_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 16400)
-- Name: petugas petugas_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petugas
    ADD CONSTRAINT petugas_username_key UNIQUE (username);


--
-- TOC entry 4790 (class 2606 OID 16437)
-- Name: siswa siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT siswa_pkey PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 16423)
-- Name: buku buku_kategori_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_kategori_id_fkey FOREIGN KEY (kategori_id) REFERENCES public.kategori(id) ON DELETE SET NULL;


--
-- TOC entry 4794 (class 2606 OID 16455)
-- Name: peminjaman peminjaman_buku_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_buku_id_fkey FOREIGN KEY (buku_id) REFERENCES public.buku(id) ON DELETE CASCADE;


--
-- TOC entry 4795 (class 2606 OID 16450)
-- Name: peminjaman peminjaman_siswa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_siswa_id_fkey FOREIGN KEY (siswa_id) REFERENCES public.siswa(id) ON DELETE CASCADE;


-- Completed on 2026-07-09 00:02:39

--
-- PostgreSQL database dump complete
--

\unrestrict e3ZDt1XdH8dzbW1FeBt5HZlYpojccCJ0juTxMgK2QQlK44S9AsggiUrt0xut5yA

