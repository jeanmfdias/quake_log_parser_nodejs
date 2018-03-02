module.exports = function(fact) {
  switch (fact) {
    case "MOD_RAILGUN":
      return "usando a arma Railgun.";
      break;
    case "MOD_TRIGGER_HURT":
      return "pois estava ferido e caiu de uma altura que o matou.";
      break;
    case "MOD_ROCKET_SPLASH":
      return "usando a arma Rocket Splash.";
      break;
    case "MOD_FALLING":
      return "pois caiu de uma altura que o matou.";
      break;
    case "MOD_ROCKET":
      return "usando a arma Rocket";
      break;
    default:
      return fact;
  }
}
