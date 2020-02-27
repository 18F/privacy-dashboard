describe "sample", type: :feature, js: true do
  it "has the page title" do
    visit '/'

    expect(page).to have_title "PII Inventory"
  end
end