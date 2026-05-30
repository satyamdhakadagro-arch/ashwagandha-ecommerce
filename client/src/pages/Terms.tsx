export default function Terms() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Ashwagandha Premium's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p>
              The materials on Ashwagandha Premium's website are provided on an 'as is' basis. Ashwagandha Premium makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p>
              In no event shall Ashwagandha Premium or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ashwagandha Premium's website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Ashwagandha Premium's website could include technical, typographical, or photographic errors. Ashwagandha Premium does not warrant that any of the materials on its website are accurate, complete, or current. Ashwagandha Premium may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
            <p>
              Ashwagandha Premium has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Ashwagandha Premium of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
            <p>
              Ashwagandha Premium may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
