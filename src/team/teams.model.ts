import * as mongoose from 'mongoose';

// Game rule setting
export const GameRuleSettingSubSchema = new mongoose.Schema(
  {
    ruleName: { type: String, required: true, default: '' },
    ruleId: { type: String, required: true },
    mercyRuleLimit: { type: String, default: null },
    gender: { type: String, required: true },
    gamePeriods: { type: Number, required: true },
    periodDuration: { type: Number, required: true },
    gapBetweenPeriods: { type: Number, required: true },
    gapBetweenHalves: { type: Number, required: true },
    timeoutDuration: { type: Number, required: true },
    timeoutsPerHalf: { type: Number, required: true },
    timeoutsInOvertimePeriod: { type: Number, required: true },
    maxOvertimePeriods: { type: Number, required: true },
    overtimePeriodDuration: { type: Number, required: true },
    goalDiffForRunningClock: { type: Number, default: null },
    maxPersonalFouls: { type: Number, required: true },
    maxFOViolationPerHalf: { type: Number, required: true },
  },
  { timestamps: true, _id: false },
);

// Turnover options
export const defalt_turnover_options = [
  { name: 'Bad Pass', slug: 'bad_pass' },
  { name: 'Warding', slug: 'warding' },
  { name: 'Illegal Screen', slug: 'illegal_screen' },
  { name: 'Push', slug: 'push' },
  { name: 'Dropped Ball', slug: 'dropped_ball' },
  { name: 'Failure to Advance', slug: 'failure_to_advance' },
  { name: 'Unforced error', slug: 'unforced_error' },
  { name: 'Equipment', slug: 'equipment' },
];
export const OptionSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: false, _id: false },
);

// Penalty options
const penalty_option_slugs = { technical: 'technical', personal: 'personal' };
export type penaltyOptionSlugsEnumType = keyof typeof penalty_option_slugs;

export const PenaltyOptionSubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: Object.values(penalty_option_slugs),
      unique: true,
    },
    option: { type: [OptionSubSchema] },
  },
  { timestamps: false, _id: false },
);

export const defalt_penalty_options = [
  {
    name: penalty_option_slugs.technical,
    option: [
      { name: 'Crease Violation', slug: 'crease_violation' },
      { name: 'Holding', slug: 'holding' },
      { name: 'Illegal Screen', slug: 'illegal_screen' },
      { name: 'Illegal Procedure', slug: 'illegal_procedure' },
      { name: 'Conduct Foul', slug: 'conduct_foul' },
      { name: 'Interferene', slug: 'interference' },
      { name: 'Pushing', slug: 'pushing' },
      { name: 'Warding', slug: 'warding' },
      { name: 'Holding Ball From Play', slug: 'holding_ball_from_play' },
      { name: 'Misconduct', slug: 'misconduct' },
    ],
  },
  {
    name: penalty_option_slugs.personal,
    option: [
      { name: 'Cross Check', slug: 'cross_check' },
      { name: 'Illegal Body Check', slug: 'illegal_body_check' },
      { name: 'Targeting', slug: 'targeting' },
      { name: 'Illegal Crosse', slug: 'illegal_crosse' },
      { name: 'Slashing', slug: 'slashing' },
      { name: 'Tripping', slug: 'tripping' },
      { name: 'Unnecessary roughness', slug: 'unnecessary_roughness' },
      { name: 'Fouling Out', slug: 'fouling_out' },
      { name: 'Ejection', slug: 'ejection' },
      { name: 'Miscounduct', slug: 'misconduct' },
    ],
  },
];

export const default_penalty_time_options = [30, 60, 90, 120, 180];

// Turnover options
export const default_stats_rating = [
  { name: 'Penalty', slug: 'penaltyNum', value: 0 },
  { name: 'Faceoff attempt', slug: 'foffsAttempts', value: 0 },
  { name: 'Faceoff won', slug: 'faceoffsWon', value: 1 },
  { name: 'F/o violation', slug: 'faceoffViolations', value: 0 },
  { name: 'Ground ball', slug: 'groundBall', value: 1 },
  { name: 'Takeaway', slug: 'takeAway', value: 1 },
  { name: 'Interception', slug: 'interception', value: 1 },
  { name: 'Turnover', slug: 'turnOver', value: -1 },
  { name: 'Caused Turnover', slug: 'causedTurnover', value: 1 },
  { name: 'New Goalie', slug: 'equipment', value: 0 },
  { name: 'Shot Attempt', slug: 'shotAttempts', value: 0 },
  { name: 'Goal', slug: 'goals', value: 1 },
  { name: 'Assist', slug: 'assists', value: 1 },
  { name: 'Save', slug: 'saves', value: 1 },
  { name: 'Lost possession', slug: 'lostPossessions', value: 0 },
  { name: 'Retain Possession', slug: 'retainedPoss', value: 0 },
  { name: 'Unforced Error', slug: 'unforcedError', value: -1 },
  { name: 'Shot On Goal', slug: 'shotOG', value: 0 },
  { name: 'Goal Against', slug: 'goalsAgainst', value: -1 },
];
export const StatsRatingSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: false, _id: false },
);

export enum SettingNameEnum {
  game_rules_setting = "game_rules_setting",
  penalty_time_options = "penalty_time_options",
  turnover_options = "turnover_options",
  penalty_options = "penalty_options",
  stats_rating = "stats_rating"
}
export type SettingNameEnumType = keyof typeof SettingNameEnum;


export const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true },
    teamNickName: { type: String, default: null },
    coachName: { type: String, default: null },
    coachCell: { type: String, default: null },
    coachEmail: { type: String, default: null },
    teamOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameRules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rule',
      required: true,
    },
    game_rules_setting: { type: GameRuleSettingSubSchema, default: null },
    game_clock_setting: { type: Object, default: null },
    shot_clock_setting: { type: Object, default: null },
    penalty_clock_setting: { type: Object, default: null },
    turnover_options: {
      type: [OptionSubSchema],
      default: defalt_turnover_options,
    },
    penalty_options: {
      type: [PenaltyOptionSubSchema],
      default: defalt_penalty_options,
    },
    penalty_time_options: {
      type: Array,
      default: default_penalty_time_options,
    }, // In seconds
    stats_rating: {
      type: [StatsRatingSubSchema],
      default: default_stats_rating,
    },
  },
  { timestamps: true },
);
