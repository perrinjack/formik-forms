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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    width: '100%', // Fix IE 11 issue.
  
  },
  link: {
    color: 'rgba(255, 255, 255, 0.7)', // Fix IE 11 issue.
  },
}));
function SignupForm() {
  const classes = useStyles();
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
              .email('Invalid email address')
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
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
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
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        placeholder="Elon"
                        className={classes.text}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        placeholder="Musk"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="username"
                        type="text"
                        label="Username"
                        placeholder="@perrinjack96"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        type="password"
                        label="Password"
                        name="password"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        type="password"
                        label="Confirm Password"
                        name="passwordConfirm"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        onClick={submitForm}
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
