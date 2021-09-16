import router from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const onAddMeetupHandler = async (enteredMeetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>
            Add a New Meetup
        </title>
        <meta name='description' description='Add your own meetups and create amazing networking opportunities.'/>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
