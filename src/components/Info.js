// Information and instruction page

export default function InfoPage(props) {
    function handleClose() {
        document
            .getElementById("info")
            .classList.replace("fade-in", "fade-out-info");
        setTimeout(() => {
            document.getElementById("info").close();
            document.body.style.overflow = null;
            document
                .getElementById("info")
                .classList.replace("fade-out-info", "fade-in");
        }, 333);
    }
    return (
        <>
            <dialog id="info" className="fade-in">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-8">
                            <div className="cw-title-green">#ClimateWall</div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                            }}
                            className="col-4 mt-3 text-end close-button">
                            &times;
                        </div>
                    </div>
                    <div className="row">
                        <h1>How does it work?</h1>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p>
                                Welcome to our{" "}
                                <a
                                    rel="noreferrer"
                                    href="https://www.exeter.ac.uk/about/sustainability/newsandevents/events/"
                                    target="_blank">
                                    Climate Wall
                                </a>
                                ! We would love you to take part. You can
                                interact with the wall in person or via your
                                phone. Create your own message, answer a
                                question or tell us how you are feeling. Our aim
                                is to encourage reflection around climate change
                                issues and to create a record of how people feel
                                in the run up to COP 28, the international
                                climate summit in Dubai. We are after honest,
                                emotional responses and answers to our
                                questions. Please feel free to play with it.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <h1>How do you post a message?</h1>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="cw-title-green">In Person</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <ul>
                                <li>
                                    <p>
                                        You can create your response to the
                                        questions posed on the wall by using the
                                        words that are at the bottom.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        As you walk past the projected content
                                        on the Wall it will pick up on your
                                        movement.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        The words that appear on the Wall will
                                        move as you move.
                                    </p>
                                </li>
                                <li>
                                    <p>Play with the words by moving around.</p>
                                </li>
                                <li>
                                    <p>
                                        If you stand near a word for long enough
                                        it will lock onto you and it will then
                                        move up the Wall.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Stay still and watch it rise up the
                                        Wall.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        You can then move the word left or right
                                        to individualise your response.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Once your word forms part of the
                                        response you can start again by grabbing
                                        another word and adding it to your
                                        response.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Once you have created your response on
                                        the Wall it will be posted to our
                                        database and may be used in future
                                        communications.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        If more than one person is using the
                                        Wall you will need to work as a team.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Have fun! Experiment. See what you come
                                        up with.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="cw-title-green">
                                Or by using your mobile and the online app
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <ul>
                                <li>
                                    <p>
                                        Scan the QR code projected on the Wall
                                        and follow the instructions online.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        The words will appear on the Wall after
                                        going to a moderator and can then be
                                        used to form new responses - please be
                                        patient.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="cw-title-green">Code of Conduct</div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p>
                                We want to create a safe and inclusive space for
                                everyone. Your message is completely anonymous.
                                The message you post via the online app will go
                                to a moderator before it goes up on the wall. Do
                                think before you post. You have a maximum of 150
                                characters. Please respond to the questions
                                displayed.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Your response will be rejected if it includes
                                the following:
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <ul>
                                <li>
                                    <p>Swearing.</p>
                                </li>
                                <li>
                                    <p>Hate language.</p>
                                </li>
                                <li>
                                    <p>
                                        Glib replies - as in ‘waste of time’,
                                        ‘this is stupid’ etc.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Identifying of individuals by name,
                                        title, job or description (potentially
                                        libellous).
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        No naming of specific organisations
                                        (also potentially libellous).
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Again due to libel, unsubstantiated
                                        statements will have to be checked if
                                        they are posted onto the wall.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Any of the above will be rejected before they
                                make it up onto the Wall including any statement
                                which the moderator considers could be
                                defamatory or affect the reputation of an
                                individual and/or organisation. References to
                                industries or sectors will be considered.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                All messages must be in English. We do however
                                have poetry in different languages from the COP
                                27{" "}
                                <a
                                    href="https://greenfutures.exeter.ac.uk/article/one-chance-left/"
                                    target="_blank"
                                    rel="noreferrer">
                                    poetry projects
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Responses must be relevant to the current
                                message or question displayed.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Please give us an honest response about what you
                                are feeling or have a go at answering some of
                                the questions. Any message posted will be saved
                                and may be used in other sustainability projects
                                or campaigns.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Have fun. Play with the words. Let us know what
                                you think.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                Please note: the views and/or opinions expressed
                                on the Climate Wall are those of the individuals
                                who have posted a comment and do not represent
                                those of the University.
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>
                                <a
                                    rel="noreferrer"
                                    href="https://www.instagram.com/uoesustainability"
                                    target="_blank">
                                    @uoesustainability
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <p>#ClimateWall #sustainability #ClimateAction</p>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
