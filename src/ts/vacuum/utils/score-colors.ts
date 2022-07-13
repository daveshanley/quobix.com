export function GetScoreColor(value: number): string {
  switch (true) {
    case value <= 10:
      return 'error';

    case value > 10 && value < 20:
      return 'warn-400';

    case value >= 20 && value < 30:
      return 'warn-300';

    case value >= 30 && value < 40:
      return 'warn-200';

    case value >= 40 && value < 50:
      return 'warn';

    case value >= 50 && value < 65:
      return 'ok-400';

    case value >= 65 && value < 75:
      return 'ok-300';

    case value >= 75 && value < 95:
      return 'ok-200';

    case value >= 95:
      return 'ok';

    default:
      return '';
  }
}

export function GetScoreEvaluation(value: number): string {
  switch (true) {
    case value <= 10:
      return 'Terrible';

    case value > 10 && value < 20:
      return 'Very, very poor';

    case value >= 20 && value < 30:
      return 'Needs tons of work!';

    case value >= 30 && value < 40:
      return 'Not great at all';

    case value >= 40 && value < 50:
      return 'Not great';

    case value >= 50 && value < 65:
      return 'Weak, but passable';

    case value >= 65 && value < 75:
      return 'OK, not too bad';

    case value >= 75 && value < 95:
      return 'Pretty good';

    case value >= 95:
      return 'Excellent';

    default:
      return '';
  }
}
