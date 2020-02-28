describe "the card page", type: :feature do
  before do
    visit '/'
  end

  it "loads the test data" do
    expect(all('.card').count).to eq 4
    expect(find("#result-count").text).to eq "4"
  end

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
