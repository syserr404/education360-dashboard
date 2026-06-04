-- Run this in your Supabase SQL Editor to create the workshop_submissions table

CREATE TABLE workshop_submissions (
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
  notify_events   BOOLEAN
);

CREATE INDEX idx_workshop_submitted_at ON workshop_submissions (submitted_at DESC);
CREATE INDEX idx_workshop_email        ON workshop_submissions (email);
