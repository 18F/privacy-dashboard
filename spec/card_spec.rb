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
  
    it "cards have the expected elements" do
      first_card = first('.card')
      
      expect(first_card.has_css?('.system')).to be_truthy
      expect(first_card.has_text?('Type:')).to be_truthy
      expect(first_card.has_text?('SORN ID:')).to be_truthy
      expect(first_card.has_text?('PII:')).to be_truthy
      expect(first_card.has_link?('Source')).to be_truthy
    end
  end

  xcontext "NOT WORKING YET quick filters" do
    describe "clicking on SSN" do
      it "filters the list" do
        find("#filter__SSN_label").click

        expect(find("#result-count").text).to eq "2"
      end
    end
  end

  xcontext "NOT WORKING YET Custom filters" do
    describe "clicking on SORN" do
      it "filters the list" do
        find("#filter__SORN_label").click

        expect(find("#result-count").text).to eq "2"
        expect(all('.card').length).to eq 2
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

      it "shows all cards againa when search field is erased" do
        find("#system-field").set("")

        expect(find("#result-count").text).to eq "4"
        expect(all('.card').length).to eq 4
        expect(all(".system")[0].text).to eq "First System Name"
      end
    end
  end

  it "matching numbers start at full count" do
    expect(find("#result-count").text).to eq "4"
    expect(find("#total-count").text).to eq "4"
  end
end
