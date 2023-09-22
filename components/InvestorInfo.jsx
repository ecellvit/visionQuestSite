import styles from '@/styles/investors.module.css'
export default function InvestorInfo(props) {
  // static page for displaying round 2 information
  const investorDetails = [
    {
      name:"Investor 1" ,
      description :`In the world of investing, this seasoned and perceptive individual stands as a beacon of
      excellence, exemplifying the qualities of a responsible and successful investor. While their
      brilliance may not always be immediately obvious, their results speak volumes, and their
      contributions to the financial world are undeniable. In a landscape filled with alluring
      alternatives, potential investors may want to carefully weigh the implications of their request for
      a stake in ventures, considering whether it aligns with their own financial objectives and risk
      tolerance. Low stake asking from this investor would help the companies regain control over the
      organization. On the other hand, high stake asking would dilute the risk of multiple owners
      making the firm more resilient in times of challenge.`
    },
    {
      name: "Investor 2",
      description: `Their precision in assessing risks elicits admiration and curiosity, as they expertly balance the
      tightrope between monumental success and occasional setbacks. With a unique talent for
      dissecting complex financial landscapes, they make well-informed and calculated decisions,
      pursuing opportunities when presented. Their commitment to exploring uncharted territories and
      expanding the horizons of conventional investment showcases a deep dedication to crafting
      success. The stake asking might be low but the connections and the experience bringing to the
      table weigh more than the money given to the team. High stake asking from this investor would
      benefit the company by providing access to new markets and investor affiliated companies in
      the field of IT and Fashion.`
    },
    {
      name: "Investor 3",
      description: `This investor possesses a remarkable talent for crafting intricate financial
opportunities, offering companies the promise of significant growth and
substantial funding commitments. Their presentations are a captivating
display of persuasive rhetoric, envisioning a prosperous future for those
fortunate enough to secure their investments. There's a sense of high
ambition at play, with a reward that extends beyond mere equity, wrapped in
an air of curiosity.
The investment terms they propose may appear straightforward on the
surface, but they harbor layers of intricacy, requiring a sharp analytical mind
to decipher the full extent of their intentions. This investor is requesting
approximately 15-20% stake in the company, which can be seen as a sign of
their commitment and belief in the company's potential.`
    },
    {
      name:"Investor 4",
      description: `In the world of investing, this seasoned individual stands as a beacon of excellence, exemplifying the qualities of a responsible and successful investor. Their results speak volumes, and their contributions to the financial world are undeniable. They offer a low stake request, which empowers companies to maintain control while still benefiting from their expertise, making them a trustworthy and invaluable asset.`
    },
    {
      name:"Investor 5",
      description: `This investor's precise risk assessment skills inspire admiration and curiosity. They expertly balance between success and setbacks while upholding unwavering honesty and integrity. Their unique talent for navigating complex financial landscapes, making informed decisions, and ethical investment practices makes them a good choice. Their stake request may seem modest financially, but the true value lies in their vast network and experience.  A high stake request from them promises access to new markets and investor-affiliated companies in IT and Fashion, all anchored in their reliable character.`
    }
  ];

  return (
    <div className={styles.investorList}>
      <h1>Investors</h1>
      <div className={styles.investorListDiv}>List of Investors.</div>
        {investorDetails.map((x) => (
          <div key={x.name} className={styles.investor}>
            <h1 className={styles.heading_test}>{x.name}</h1>
            <p className={styles.paragraph_text}>{x.description}</p>
          </div>
        ))}
      <div className={styles.proceed_button}>
      <button
        onClick={() => {
          props.onProceed();
        }}
      >
        Proceed
      </button>
      </div>
    </div>
  );
}
