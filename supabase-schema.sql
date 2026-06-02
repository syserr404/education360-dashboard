-- Run this in your Supabase SQL Editor to create the submissions table

CREATE TABLE submissions (
  id                    BIGSERIAL PRIMARY KEY,
  submitted_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Identity
  email                 TEXT NOT NULL,
  session_id            TEXT,

  -- District
  district_name         TEXT,
  county                TEXT,
  students              INTEGER,
  educators             INTEGER,
  leaders               INTEGER,
  selection_method      TEXT,

  -- Tools
  tool_count            INTEGER,
  tools                 TEXT[],

  -- Spend
  current_annual_spend  NUMERIC,
  e360_annual_cost      NUMERIC,
  total_y1_spend        NUMERIC,
  total_y2_spend        NUMERIC,
  total_y3_spend        NUMERIC,

  -- Savings
  saving_y2_vs_today    NUMERIC,
  saving_y3_vs_today    NUMERIC,
  spend_reduction_pct   INTEGER,
  cost_per_student_today INTEGER,
  cost_per_student_y3   INTEGER,
  payback_years         NUMERIC,

  -- Hours
  hours_lost_weekly_today  INTEGER,
  hours_recovered_y1       INTEGER,
  hours_recovered_y2       INTEGER,
  hours_recovered_y3       INTEGER,
  leader_hrs_recovered_y3  INTEGER,
  admin_hrs_week           INTEGER
);

-- Index for dashboard queries
CREATE INDEX idx_submissions_submitted_at ON submissions (submitted_at DESC);
CREATE INDEX idx_submissions_email        ON submissions (email);
CREATE INDEX idx_submissions_county       ON submissions (county);
