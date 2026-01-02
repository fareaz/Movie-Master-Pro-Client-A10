
const FAQ = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are some common questions about MovieMaster Pro.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title font-medium">
            Is MovieMaster Pro free to use?
          </div>
          <div className="collapse-content text-gray-600 dark:text-gray-400">
            <p>
              Yes, MovieMaster Pro is completely free. You can explore movies and
              manage your personal collection without any cost.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-medium">
            Can I upload my own movies?
          </div>
          <div className="collapse-content text-gray-600 dark:text-gray-400">
            <p>
              Yes. Logged-in users can upload, edit, and delete their own movies
              from the platform.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-medium">
            Is my data secure?
          </div>
          <div className="collapse-content text-gray-600 dark:text-gray-400">
            <p>
              Absolutely. We use Firebase Authentication and protected backend
              APIs to ensure your data remains safe and private.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-medium">
            Can I use MovieMaster Pro on mobile?
          </div>
          <div className="collapse-content text-gray-600 dark:text-gray-400">
            <p>
              Yes. The platform is fully responsive and works perfectly on
              mobile, tablet, and desktop devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
