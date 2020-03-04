context "the card page", type: :feature, js: true do
  before do
    visit '/'
  end

  describe "loads the test environment" do
    it "test env is set" do
      expect(find('#jekyll-env').text).to eq("test")
    end

    it "test data is loaded" do
      expect(all('.card').length).to eq 4
    end
  end

  describe "has the basic html" do
    it "has the page title" do
      expect(page).to have_title "PII Inventory"
    end

    it "has general search bar" do
      expect(page).to have_selector "#general-search"
      expect(page).to have_selector "#general-search-button"
    end

    it "has filter elements" do
      expect(page).to have_selector "#system-field"
      expect(page).to have_selector "#sorn-field"
      expect(page).to have_selector "#pii-field"
      expect(page).to have_selector("#filter__PIA", visible: false)
      expect(page).to have_selector("#filter__SORNS", visible: false)
      expect(page).to have_selector("#filter__SSN", visible: false)
      expect(page).to have_selector("#filter__email", visible: false)
    end
  
    it "cards have the expected elements" do
      first_card = first('.card')
      
      expect(first_card.has_css?('.system')).to be_truthy
      expect(first_card.has_text?('Type:')).to be_truthy
      expect(first_card.has_text?('SORN ID:')).to be_truthy
      expect(first_card.has_text?('PII:')).to be_truthy
      expect(first_card.has_link?('Source')).to be_truthy
    end
  end

  context "general search" do
    describe "finds searched systems" do
      it "when searching by system name" do
        find("#general-search").set("First System Name")
        find("#general-search-button").click
        
        expect(all('.card').length).to eq 1
        expect(find(".system").text).to eq "First System Name"
      end

      xit "when searching by SORN ID" do
      end

      xit "when searching by PII" do
      end
    end

    xdescribe "shows count of matching systems to the search term" do
    end
  end

  context "Quick filters" do
    describe "clicking on SSN" do
      it "filters the list" do
        find("#filter__SSN_label").click

        expect(find("#result-count").text).to eq "2"
        expect(all('.card').length).to eq 2

        expect(all('.pii')[0].text.downcase).to include "ssn"
        expect(all('.pii')[1].text.downcase).to include "ssn"
      end

      it "shows an active filter pill" do
        find("#filter__SSN_label").click

        expect(find("#ssn-tag")).to be_truthy
        expect(find("#ssn-tag").text).to eq "PII: SSN"
      end

      it "highlights the matching pii" do
        find("#filter__SSN_label").click

        # test data has 2 matches, upper and lower case
        expect(all('.highlight').count).to eq 2
        all('.highlight').each do |li|
          expect(li.text).to match(/SSN/i)
        end
      end
    end

    describe "clicking on email" do
      it "filters the list" do
        find("#filter__email_label").click

        expect(find("#result-count").text).to eq "1"
        expect(all('.card').length).to eq 1

        expect(all('.pii')[0].text.downcase).to include "email"
      end

      it "shows an active filter pill" do
        find("#filter__email_label").click

        expect(find("#email-tag")).to be_truthy
        expect(find("#email-tag").text).to eq "PII: EMAIL"
      end

      it "highlights the matching pii" do
        find("#filter__email_label").click

        # test data has 1 match
        expect(all('.highlight').count).to eq 1
        expect(find('.highlight').text).to eq "email"
      end
    end
  end

  context "Custom filters" do
    describe "clicking on SORN" do
      it "filters the list" do
        find("#filter__SORN_label").click

        expect(find("#result-count").text).to eq "2"
        expect(all('.card').length).to eq 2
      end

      it "clicking again unfilters the list" do
        find("#filter__SORN_label").click
        find("#filter__SORN_label").click

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
      end
    end

    describe "clicking on PIA" do
      it "filters the list" do
        find("#filter__PIA_label").click

        expect(find("#result-count").text).to eq "2"
        expect(all('.card').length).to eq 2
      end

      it "clicking again unfilters the list" do
        find("#filter__PIA_label").click
        find("#filter__PIA_label").click

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
      end
    end
  end

  context "Search filters" do
    describe "typing in System search" do
      it "filters the list" do
        find("#system-field").set("First System Name")

        expect(find("#result-count").text).to eq "1"
        expect(all('.card').length).to eq 1
        expect(find(".system").text).to eq "First System Name"
      end

      it "shows an active filter pill" do
        find("#system-field").set("First System Name")

        expect(find("#system-tag")).to be_truthy
        expect(find("#system-tag").text).to eq "SYSTEM: FIRST SYSTEM NAME"
      end

      it "shows all cards again when search field is erased" do
        find("#system-field").set("")

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
        expect(all(".system")[0].text).to eq "First System Name"
      end
    end

    describe "typing in SORN ID search" do
      it "filters the list" do
        find("#sorn-field").set("GSA/PPFM-11")

        expect(find("#result-count").text).to eq "1"
        expect(all('.card').length).to eq 1
        expect(find(".sorn-id").text).to eq "GSA/PPFM-11"
      end

      it "shows an active filter pill" do
        find("#sorn-field").set("GSA/PPFM-11")

        expect(find("#sorn-tag")).to be_truthy
        expect(find("#sorn-tag").text).to eq "SORN: GSA/PPFM-11"
      end

      it "shows all cards again when search field is erased" do
        find("#sorn-field").set("")

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
      end
    end

    describe "typing in PII search" do
      it "filters the list" do
        find("#pii-field").set("FIRST SYSTEM ONLY PII")

        expect(find("#result-count").text).to eq "1"
        expect(all('.card').length).to eq 1
        expect(find(".pii").text).to include "FIRST SYSTEM ONLY PII"
      end

      it "shows an active filter pill" do
        find("#pii-field").set("FIRST SYSTEM ONLY PII")

        expect(find("#pii-tag")).to be_truthy
        expect(find("#pii-tag").text).to eq "PII: FIRST SYSTEM ONLY PII"
      end

      it "highlights the matching pii" do
        find("#pii-field").set("FIRST SYSTEM ONLY PII")

        # test data has 1 match
        expect(all('.highlight').count).to eq 1
        expect(find('.highlight').text).to eq "FIRST SYSTEM ONLY PII"
      end

      it "shows all cards again when search field is erased" do
        find("#pii-field").set("")

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
      end
    end
  end

  it "matching numbers start at full count" do
    expect(find("#result-count").text).to eq "4"
    expect(find("#total-count").text).to eq "4"
  end
end
