import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

Yup.addMethod(Yup.string, 'phone', function (message) {
  return this.test({
    name: 'phone',
    message: message || 'Username is Taken', // expect an i18n message to be passed in
    test: async function (value) {
      const response = await fetch(`/validators/phone?value=${value}`);
      const array = ['@perrinjack96'];
      var x = await resolveAfter2Seconds(true, array, value);
      // return
      return x;
    },
  });
});

function resolveAfter2Seconds(x, array, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!array.includes(value));
    }, 122.4);
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valid: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'green',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'green !important',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(2),
    background: '#424242',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));
function SignupForm() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Container maxWidth="xs" component="main">
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('✘ Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .required('Password is required')
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
              ),
            passwordConfirm: Yup.string()
              .oneOf([Yup.ref('password'), null], "Passwords don't match")
              .required('Password confirm is required'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            username: Yup.string()
              .required('Please enter your Username')
              .matches(/^@/, 'Username must begin with @')
              .matches(/\b[a-zA-Z0-9_]+\b$/, 'Username must be one word')
              .min(4, 'Username must be between 4 and 14 letters')
              .max(14, 'Username must be between 4 and 14 letters')
              .phone('That Username Looks to be taken'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {(props: FormikProps<any>) => (
            <div className={classes.root}>
              <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="firstName"
                        label={
                          props.touched.firstName && !props.errors.firstName
                            ? 'First Name ✓'
                            : 'First Name'
                        }
                        fullWidth
                        variant="outlined"
                        placeholder="Elon"
                        className={
                          props.touched.firstName && !props.errors.firstName
                            ? classes.valid
                            : null
                        }
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.firstName && !props.errors.firstName
                                ? 'green'
                                : null,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="lastName"
                        label={
                          props.touched.lastName && !props.errors.lastName
                            ? 'Last Name ✓'
                            : 'Last Name'
                        }
                        fullWidth
                        placeholder="Musk"
                        variant="outlined"
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.lastName && !props.errors.lastName
                                ? 'green'
                                : null,
                          },
                        }}
                        className={
                          props.touched.lastName && !props.errors.lastName
                            ? classes.valid
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="username"
                        type="text"
                        label={
                          props.touched.username && !props.errors.username
                            ? 'Username ✓'
                            : 'Username'
                        }
                        placeholder="@perrinjack96"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.username && !props.errors.username
                                ? 'green'
                                : null,
                          },
                        }}
                        className={
                          props.touched.username && !props.errors.username
                            ? classes.valid
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label={
                          props.touched.email && !props.errors.email
                            ? 'Email ✓'
                            : 'Email'
                        }
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.email && !props.errors.email
                                ? 'green'
                                : null,
                          },
                        }}
                        className={
                          props.touched.email && !props.errors.email
                            ? classes.valid
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        component={TextField}
                        type={showPassword ? 'text' : 'password'}
                        label={
                          props.touched.password && !props.errors.password
                            ? 'Password ✓'
                            : 'Password'
                        }
                        name="password"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.password && !props.errors.password
                                ? 'green'
                                : null,
                          },
                        }}
                        className={
                          props.touched.password && !props.errors.password
                            ? classes.valid
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        type="password"
                        label={
                          props.touched.passwordConfirm &&
                          !props.errors.passwordConfirm
                            ? 'Passwords Match ✓'
                            : 'Confirm Password'
                        }
                        name="passwordConfirm"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          style: {
                            color:
                              props.touched.passwordConfirm &&
                              !props.errors.passwordConfirm
                                ? 'green'
                                : null,
                          },
                        }}
                        className={
                          props.touched.passwordConfirm &&
                          !props.errors.passwordConfirm
                            ? classes.valid
                            : null
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={
                          !(
                            props.isValid &&
                            Object.keys(props.touched).length > 1
                          ) | props.isSubmitting
                        }
                        onClick={props.submitForm}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item>
                        <Link href="#" variant="body2">
                          Sign in
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          Terms & Conditions
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Paper>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default SignupForm;
