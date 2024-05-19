package com.swe573.infoshare.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.ScrollPosition.Direction;
import org.springframework.stereotype.Service;

import com.swe573.infoshare.exceptions.UnauthorizedActionException;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.Post;
import com.swe573.infoshare.model.PostTemplate;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.model.UserCommunityRole;
import com.swe573.infoshare.repository.CommunityRepository;
import com.swe573.infoshare.repository.CommunityUserRepository;
import com.swe573.infoshare.repository.PostRepository;
import com.swe573.infoshare.repository.PostTemplateRepository;
import com.swe573.infoshare.request.post.NewPostRequest;
import com.swe573.infoshare.request.post.NewTemplateRequest;
import com.swe573.infoshare.response.PostListResponse;
import com.swe573.infoshare.response.PostTemplateResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CommunityRepository communityRepository;
    private final CommunityUserRepository communityUserRepository;
    private final PostTemplateRepository postTemplateRepository;

    public void submitNewPost(User user, NewPostRequest request) {

        Community community = communityRepository.getReferenceById(request.getCommunityId());
        Post newPost = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .community(community)
                .createdBy(user)
                .build();

        if (request.getPostTemplateId() != null) {

            PostTemplate postTemplate = postTemplateRepository.getReferenceById(request.getPostTemplateId());

            newPost.setPostTemplate(postTemplate);

        }

        postRepository.save(newPost);
    }

    public List<PostListResponse> getAllCommunityPosts(Long communityId) {
        Community community = communityRepository.getReferenceById(communityId);

        List<Post> posts = postRepository.findAllByCommunityAndDeletedOrderByCreatedAtDesc(community, false);
        return posts.stream().map(p -> PostListResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .content(p.getContent())
                .communityId(communityId)
                .communityName(p.getCommunity().getName())
                .createdById(p.getCreatedBy().getId())
                .createdByName(String.format("%s %s", p.getCreatedBy().getName(), p.getCreatedBy().getLastname()))
                .createdAt(p.getCreatedAt())
                .postTemplate(p.getPostTemplate() != null ? p.getPostTemplate().getTemplate() : null)
                .build()).toList();
    }

    public List<PostListResponse> getAllUserPosts(User user) {

        List<CommunityUser> communityUsers = communityUserRepository.findAllByUserAndDeleted(user, false);

        List<Community> communities = communityUsers.stream().map(c -> c.getCommunity()).toList();

        List<Post> posts = postRepository.findAllByCommunityInAndDeletedOrderByCreatedAtDesc(communities, false);

        return posts.stream().map(p -> PostListResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .content(p.getContent())
                .communityId(p.getCommunity().getId())
                .communityName(p.getCommunity().getName())
                .createdById(p.getCreatedBy().getId())
                .createdByName(String.format("%s %s", p.getCreatedBy().getName(), p.getCreatedBy().getLastname()))
                .createdAt(p.getCreatedAt())
                .postTemplate(p.getPostTemplate() != null ? p.getPostTemplate().getTemplate() : null)
                .build()).toList();
    }

    public void createNewPostTemplate(User user, NewTemplateRequest request) {
        CommunityUser communityUser = communityUserRepository
                .getReferenceById(new CommunityUserId(request.getCommunityId(), user.getId()));

        if (communityUser.getUserCommunityRole() == UserCommunityRole.MEMBER)
            throw new UnauthorizedActionException();

        PostTemplate postTemplate = PostTemplate.builder()
                .title(request.getTitle())
                .template(request.getTemplate())
                .createdBy(user)
                .community(communityUser.getCommunity())
                .build();

        postTemplateRepository.save(postTemplate);
    }

    public List<PostTemplateResponse> getAllCommunityTemplates(Long communityId) {
        Community community = communityRepository.getReferenceById(communityId);

        List<PostTemplate> postTemplates = postTemplateRepository.findAllByCommunityAndDeleted(community, false);

        return postTemplates.stream().map(t -> PostTemplateResponse.builder()
                .id(t.getId())
                .title(t.getTitle())
                .template(t.getTemplate())
                .build()).toList();
    }
}
