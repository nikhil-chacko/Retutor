import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import HomeContainer from './HomeContainer';

function HomePage() {
    return (
        <div>
            <Grid container direction='column'>
                <Grid item>
                    <NavBar />
                </Grid>
                <Grid container>
                    <Grid item xs={1} md={1} /> {/* Padding */}
                    <Grid item xs={10} md={5}>
                        <HomeContainer />
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
						<TeacherPage />
					</Grid> */}
                    <Grid item xs={1} md={1} /> {/* Padding */}
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;
