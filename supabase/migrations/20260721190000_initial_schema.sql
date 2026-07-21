SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET row_security = off;


CREATE TABLE IF NOT EXISTS "public"."usuarios" (
    "puuid" character varying(255) NOT NULL,
    "riot_id" character varying(100) NOT NULL,
    "avatar_url" text,
    "region" character varying(50),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "login_challenge_icon" integer,
    "login_challenge_expires_at" timestamp with time zone
);


CREATE TABLE IF NOT EXISTS "public"."desafios" (
    "id" integer NOT NULL,
    "usuario_puuid" character varying(255),
    "lane" character varying(128) NOT NULL,
    "queue" character varying(128) NOT NULL,
    "is_finished" boolean DEFAULT false,
    "current_champ" character varying(128),
    "season" integer,
    "time_spend" integer DEFAULT 0,
    "started_at" timestamp with time zone NOT NULL,
    "finished_at" timestamp with time zone,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "public"."progresso_campeoes" (
    "id" integer NOT NULL,
    "desafio_id" integer,
    "campeao_id" character varying(128) NOT NULL,
    "nome_campeao" character varying(100) NOT NULL,
    "has_victory" boolean DEFAULT false,
    "loses" integer DEFAULT 0,
    "fun_note" integer,
    "comentary" character varying(256),
    "time_spend" integer DEFAULT 0,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "progresso_campeoes_fun_note_check"
        CHECK (("fun_note" >= 1) AND ("fun_note" <= 5))
);


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" text NOT NULL,
    "user_puuid" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "last_used_at" timestamp with time zone DEFAULT now() NOT NULL,
    "expires_at" timestamp with time zone NOT NULL
);


CREATE SEQUENCE IF NOT EXISTS "public"."desafios_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS "public"."progresso_campeoes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ONLY "public"."desafios"
ALTER COLUMN "id"
SET DEFAULT nextval('"public"."desafios_id_seq"'::regclass);


ALTER TABLE ONLY "public"."progresso_campeoes"
ALTER COLUMN "id"
SET DEFAULT nextval('"public"."progresso_campeoes_id_seq"'::regclass);

ALTER TABLE ONLY "public"."usuarios"
ADD CONSTRAINT "usuarios_pkey"
PRIMARY KEY ("puuid");


ALTER TABLE ONLY "public"."desafios"
ADD CONSTRAINT "desafios_pkey"
PRIMARY KEY ("id");


ALTER TABLE ONLY "public"."progresso_campeoes"
ADD CONSTRAINT "progresso_campeoes_pkey"
PRIMARY KEY ("id");


ALTER TABLE ONLY "public"."user_sessions"
ADD CONSTRAINT "user_sessions_pkey"
PRIMARY KEY ("id");


ALTER TABLE ONLY "public"."progresso_campeoes"
ADD CONSTRAINT "progresso_campeoes_desafio_id_campeao_id_key"
UNIQUE ("desafio_id", "campeao_id");


CREATE INDEX "idx_progresso_desafio"
ON "public"."progresso_campeoes"
USING "btree" ("desafio_id");


CREATE INDEX "idx_sessions_expires_at"
ON "public"."user_sessions"
USING "btree" ("expires_at");


CREATE INDEX "idx_sessions_user_puuid"
ON "public"."user_sessions"
USING "btree" ("user_puuid");


CREATE UNIQUE INDEX "unique_active_challenge_per_user"
ON "public"."desafios"
USING "btree" ("usuario_puuid")
WHERE ("is_finished" = false);


ALTER TABLE ONLY "public"."desafios"
ADD CONSTRAINT "desafios_usuario_puuid_fkey"
FOREIGN KEY ("usuario_puuid")
REFERENCES "public"."usuarios"("puuid")
ON DELETE CASCADE;


ALTER TABLE ONLY "public"."progresso_campeoes"
ADD CONSTRAINT "progresso_campeoes_desafio_id_fkey"
FOREIGN KEY ("desafio_id")
REFERENCES "public"."desafios"("id")
ON DELETE CASCADE;


ALTER TABLE ONLY "public"."user_sessions"
ADD CONSTRAINT "user_sessions_user_puuid_fkey"
FOREIGN KEY ("user_puuid")
REFERENCES "public"."usuarios"("puuid")
ON DELETE CASCADE;


CREATE OR REPLACE VIEW "public"."leaderboard_view"
WITH ("security_invoker"='on')
AS
SELECT
    "d"."id" AS "challenge_id",
    "d"."queue",
    "d"."lane",
    "d"."is_finished",
    COALESCE("d"."time_spend", 0) AS "time_spend",
    "u"."riot_id",

    COUNT(
        CASE
            WHEN "p"."has_victory"
            THEN 1
            ELSE NULL::integer
        END
    ) AS "completed_champions",

    COALESCE(SUM("p"."loses"), 0) AS "total_losses",

    (
        COUNT(
            CASE
                WHEN "p"."has_victory"
                THEN 1
                ELSE NULL::integer
            END
        )
        +
        COALESCE(SUM("p"."loses"), 0)
    ) AS "total_matches"

FROM "public"."desafios" "d"

JOIN "public"."usuarios" "u"
ON (
    ("d"."usuario_puuid")::text = ("u"."puuid")::text
)

LEFT JOIN "public"."progresso_campeoes" "p"
ON ("p"."desafio_id" = "d"."id")

GROUP BY
    "d"."id",
    "d"."queue",
    "d"."lane",
    "d"."is_finished",
    "d"."time_spend",
    "u"."riot_id"

ORDER BY
    "d"."is_finished" DESC,
    (
        COUNT(
            CASE
                WHEN "p"."has_victory"
                THEN 1
                ELSE NULL::integer
            END
        )
        +
        COALESCE(SUM("p"."loses"), 0)
    ),
    COUNT(
        CASE
            WHEN "p"."has_victory"
            THEN 1
            ELSE NULL::integer
        END
    ) DESC,
    "d"."time_spend";

ALTER TABLE "public"."usuarios"
ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."desafios"
ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."progresso_campeoes"
ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_sessions"
ENABLE ROW LEVEL SECURITY;