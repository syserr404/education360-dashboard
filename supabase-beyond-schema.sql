-- Run this in your Supabase SQL Editor to create the beyond_submissions table

CREATE TABLE beyond_submissions (
  id              BIGSERIAL PRIMARY KEY,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Identity
  first_name      TEXT,
  last_name       TEXT,
  title           TEXT,
  school_name     TEXT,
  country         TEXT,
  school_type     TEXT,
  email           TEXT NOT NULL,
  phone           TEXT,

  -- Interest
  hear_about      TEXT,
  students_info   TEXT,
  reduce_costs    BOOLEAN,
  notify_events   BOOLEAN
);

CREATE INDEX idx_beyond_submitted_at ON beyond_submissions (submitted_at DESC);
CREATE INDEX idx_beyond_email        ON beyond_submissions (email);
