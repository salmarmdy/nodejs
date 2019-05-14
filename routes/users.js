const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const CobasController = require('../controllers/cobas');
const PeliharaansController = require('../controllers/peliharaans');
const ProfilesController = require('../controllers/profiles');



const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

router.route('/coba')
  .get(passportJWT, CobasController.coba);

router.route('/peliharaan')
  //.get(passportJWT, PeliharaansController.peliharaan)
  .get(passportJWT, PeliharaansController.index)
  .post(passportJWT, PeliharaansController.newPeliharaan);

router.route('/peliharaan/:peliharaanId')
.get(passportJWT, PeliharaansController.getPeliharaan)
.put(PeliharaansController.replacePeliharaan)
.patch(PeliharaansController.updatePeliharaan)
.delete(PeliharaansController.deletePeliharaan);

router.route('/peliharaan/:userId/user')
.get(passportJWT, PeliharaansController.getUser)
.post(passportJWT, PeliharaansController.newUser);
;

router.route('/profile')
  //.get(passportJWT, ProfilesController.peliharaan)
  .get(passportJWT, ProfilesController.index)
  .post(passportJWT, ProfilesController.newProfile);

router.route('/profile/:profilesid')
.get(passportJWT, ProfilesController.getProfile)
.put(passportJWT, ProfilesController.replaceProfile)
.patch(passportJWT,ProfilesController.updateProfile);

router.route('/:userId/peliharaan')
.get(passportJWT, UsersController.getUserPeliharaan)
.post(passportJWT, UsersController.newUserPeliharaan);

// router.route('/:userId/cars')
// .get(passportJWT, UsersController.getUserCars)
// .post(passportJWT, UsersController.newUserCars);


module.exports = router;