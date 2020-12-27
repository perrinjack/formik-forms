import * as React from 'react';
import { Formik, Form, Field} from 'formik';
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

    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    padding: theme.spacing(1),
    background: '#66A5AD',
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
  return (
    <div>
      <Container maxWidth="xs" component="main">
        {/* <Paper variant="outlined" className={classes.root} elevation={0}> */}
        <Formik
          initialValues={{
            email: '',
            password: '',
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="lastName"
                        label="Last Name"
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
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        onClick={submitForm}
                        className={classes.submit}
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
        {/* </Paper> */}
      </Container>
    </div>
  );
}

export default SignupForm;
