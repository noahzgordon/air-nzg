class User < ActiveRecord::Base
  has_many :listings
  has_many :bookings
  
  has_many :booking_requests, through: :listings, source: :bookings
  has_many :notifications, inverse_of: :user, counter_cache: true
  
  has_attached_file(
    :avatar, 
    styles: { thumb: "40x40#", small: "100x100#", medium: "300x300#" },
    default_url: "/images/missing_:style.png"
  )
  
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :email, :password_digest, presence: true, uniqueness: true
  validates :fname, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  before_save :ensure_session_token

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    user && user.is_password?(password) ? user : nil
  end
  
  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(uid: auth_hash[:uid], provider: auth_hash[:provider])
    return user if user
    
    User.create!(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider],
      email: auth_hash[:email],
      fname: auth_hash[:fname],
      lname: auth_hash[:lname],
      avatar: File.new(RestClient.get(auth_hash[:image])),
      locale: auth_hash[:location]
    )
  end
  
  :info => {
    :nickname => 'jbloggs',
    :email => 'joe@bloggs.com',
    :name => 'Joe Bloggs',
    :first_name => 'Joe',
    :last_name => 'Bloggs',
    :image => 'http://graph.facebook.com/1234567/picture?type=square',
    :urls => { :Facebook => 'http://www.facebook.com/jbloggs' },
    :location => 'Palo Alto, California',
    :verified => true

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!

    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_token
  end
end
